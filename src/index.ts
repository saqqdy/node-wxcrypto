import { decrypt } from './xmlParser'
import { aes256Decrypt } from './aes256'
import sha1 from './sha1'

const debug = require('debug')('wxcrypto')

export interface withXMLProp<T> {
    xml: T
}

export interface WeixinVerifyData {
    xml: Record<string, unknown> & {
        AppId: string
        CreateTime: string
        InfoType: 'component_verify_ticket' | string
        ComponentVerifyTicket?: string
    }
}

// xml data
export type WeixinMessageXML = withXMLProp<
    Record<string, unknown> & {
        encrypt: string
        appid: string
    }
>

// decrypt xml data
export interface WeixinMessageData extends Record<string, unknown> {
    AppId: string
    CreateTime: string
    InfoType: 'component_verify_ticket' | string
}

// verify ticket
export type WeixinVerifyMessageXMLData = withXMLProp<
    WeixinMessageData & {
        InfoType: 'component_verify_ticket'
        ComponentVerifyTicket?: string
    }
>

/**
 * 微信消息加解密nodejs版本
 *
 * @example
 * ```
 * const WxCrypto = require('node-wxcrypto');
 * const wxCrypto = new WxCrypto(token, aesKey, appID);
 *
 * var [err, encryptedXML] = wx.encrypt(xml, timestamp, nonce);
 *
 * var [err, decryptedXML] = wx.decrypt(signature, timestamp, nonce, encrypted);
 * ```
 */

// 加密消息
// export const encrypt = (text, timestamp, nonce) => {
//     const prp = new prpcrypt(this.key)
//     const re = prp.encrypt(text, this.appID)
//     if (re[0]) return re
//     const encrypted = re[1]
//     const hash = this.sha1(this.token, timestamp, nonce, encrypted)

//     const xml = `<xml>
// <Encrypt><![CDATA[${encrypted}]]></Encrypt>
// <MsgSignature><![CDATA[${hash}]]></MsgSignature>
// <TimeStamp>${timestamp}</TimeStamp>
// <Nonce><![CDATA[${nonce}]]></Nonce>
// </xml>`

//     return [false, xml]
// }

// 解密消息
// export const decrypt = (hash, timestamp, nonce, xml) => {
//     debug(
//         'begin decrypt',
//         'hash=',
//         hash,
//         'timestamp=',
//         timestamp,
//         'nonce=',
//         nonce,
//         'xml=',
//         xml
//     )
//     const obj = this.parseWechatXML(xml)
//     debug('parsed xml=', obj)
//     if (!obj || !obj.Encrypt)
//         return [true, 'wrong xml format, no Encrypt child']
//     const _hash = this.sha1(this.token, timestamp, nonce, obj.Encrypt)
//     debug('calculated hash=', _hash)
//     if (hash != _hash) return [true, 'signature not match']
//     const prp = new prpcrypt(this.key)
//     return prp.decrypt(obj.Encrypt, this.appID)
// }

// 解析微信xml
// export const parseWechatXML = xml => {
//     if (!xml || typeof xml != 'string') return {}
//     const re = {}
//     xml = xml.replace(/^<xml>|<\/xml>$/g, '')
//     const ms = xml.match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/gi)
//     if (ms && ms.length > 0) {
//         ms.forEach(t => {
//             const ms = t.match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/i)
//             const tagName = ms[1]
//             let cdata = ms[2] || ''
//             cdata = cdata.replace(/^\s*<\!\[CDATA\[\s*|\s*\]\]>\s*$/g, '')
//             re[tagName] = cdata
//         })
//     }
//     return re
// }

class WxCrypto {
    token: string
    aesKey: string
    appID: string
    constructor(token: string, aesKey: string, appID: string) {
        this.token = token
        this.aesKey = aesKey
        this.appID = appID
        debug(
            'weixin crypto class initialize with token=',
            token,
            'aesKey=',
            aesKey,
            'appID=',
            appID
        )
    }

    /**
     * parse weixin xml
     *
     * @param xmlData - xml data, start with '<xml>'
     * @returns obj - {}
     */
    parseWeixinXML(xmlData: string) {
        if (
            !xmlData ||
            typeof xmlData !== 'string' ||
            !xmlData.includes('<xml>')
        )
            return { xml: {} } as WeixinMessageXML

        xmlData = xmlData.replace(/^<xml>|<\/xml>$/g, '')
        const xml: Record<string, unknown> = {}
        const matchXML = xmlData.match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/gi)

        if (matchXML && matchXML.length > 0) {
            matchXML.forEach(item => {
                const match = item.match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/i)
                const tagName: string = match?.[1] ?? ''
                const cdata: string = (match?.[2] ?? '').replace(
                    /^\s*<\!\[CDATA\[\s*|\s*\]\]>\s*$/g,
                    ''
                )
                xml[tagName] = cdata
            })
        }
        return { xml } as WeixinMessageXML
    }

    /**
     * encrypt xml
     *
     * @param replyMsg
     * @param timestamp
     * @param nonce
     */
    // encryptXML(replyMsg, timestamp, nonce) {
    //     //
    // }

    /**
     * decrypt XML data
     *
     * @param algorithm - algorithm data or xml data
     * @param timestamp - timestamp
     * @param nonce - nonce
     * @returns xmData - xmData
     */
    async decryptXML(
        algorithm: string,
        timestamp: string | number,
        nonce: string | number
    ) {
        // if algorithm is xml string, parse it first
        if (algorithm.includes('<xml>')) {
            const xmlData = this.parseWeixinXML(algorithm)
            algorithm = xmlData.xml.encrypt || ''
        }
        // unused
        const signature = sha1(
            this.token,
            String(timestamp),
            String(nonce),
            algorithm
        )
        // console.info('signature: ', signature)
        debug('signature', signature)

        const message = aes256Decrypt(algorithm, this.aesKey)
        const data = await decrypt(
            message.substring(20, message.lastIndexOf('>') + 1) as string
        )

        const nonceStr = message.substring(0, 16)
        const len = message.substring(16, 20)
        const corpID = message.substring(message.lastIndexOf('>') + 1)
        debug(
            'message: ',
            message,
            'nonceStr: ',
            nonceStr,
            'len: ',
            len,
            'corpID: ',
            corpID
        )
        return data
    }
}

// export { WxCrypto, WxCrypto as default }
export default WxCrypto

// 2022-11-16 14:14 +08:00: 100 {
// 	signature: '4ee44e543f2689914139e58d2d239dddecf20f6e',
// 	timestamp: '1668579255',
// 	nonce: '912143275',
// 	encrypt_type: 'aes',
// 	msg_signature: 'bcc192f48436dd28a9a062379da0277bc7bf4076'
//   }
//   2022-11-16 14:14 +08:00: 101 {
// 	xml: {
// 	  appid: [ 'wx6de76e42b72881fb' ],
// 	  encrypt: [
// 		'dHK8NA/TErO5zSAKgyagSEDZ5EyG91ysSBrsEvBjsMLdvV2gnueTeFImofeCrQIeex2aopLLq9CdG5XkZl0ucuIgWKpEqKlyfc4r6+HGWgkZ0AXO62Ft53fYaJTj+ToyQNWWVAlFKktTMvJ7QzkrPC8WS3KgxllmyoaG6EnozXWSc1G07qQFhziNJqUDtPp/7Icnp+wKP8eIKCPlkVRVRaqdirzYaXsqyZkIlBwDOcRcEkL07vrqw3eWDA7tZmDvg/wr9u7+yuuqXHxW5HumfglS5tFFwc9jTtzxcSg5TfQmZ54VqUdxDPpG1cbm3qqHgP7IfMCd7tK7wXsBHUMCehkDxjcS2XsYOptyHQX3P/qwVUEJSln1/AM2sbCJhePxuvAItksmTBMtv2uMbCw5iPScDc3ynxJkCME5SKQrnv1NykQbc6OD/ZxOn3C1iGmThmfhtY4s+Zc6I01pN9zVww=='
// 	  ]
// 	}
//  }

// const { signature, timestamp, nonce, encrypt_type, msg_signature } = {
//     signature: '4ee44e543f2689914139e58d2d239dddecf20f6e',
//     timestamp: '1668579255',
//     nonce: '912143275',
//     encrypt_type: 'aes',
//     msg_signature: 'bcc192f48436dd28a9a062379da0277bc7bf4076'
// }
// const appID = 'wx6de76e42b72881fb'
// const encrypt =
//     'dHK8NA/TErO5zSAKgyagSEDZ5EyG91ysSBrsEvBjsMLdvV2gnueTeFImofeCrQIeex2aopLLq9CdG5XkZl0ucuIgWKpEqKlyfc4r6+HGWgkZ0AXO62Ft53fYaJTj+ToyQNWWVAlFKktTMvJ7QzkrPC8WS3KgxllmyoaG6EnozXWSc1G07qQFhziNJqUDtPp/7Icnp+wKP8eIKCPlkVRVRaqdirzYaXsqyZkIlBwDOcRcEkL07vrqw3eWDA7tZmDvg/wr9u7+yuuqXHxW5HumfglS5tFFwc9jTtzxcSg5TfQmZ54VqUdxDPpG1cbm3qqHgP7IfMCd7tK7wXsBHUMCehkDxjcS2XsYOptyHQX3P/qwVUEJSln1/AM2sbCJhePxuvAItksmTBMtv2uMbCw5iPScDc3ynxJkCME5SKQrnv1NykQbc6OD/ZxOn3C1iGmThmfhtY4s+Zc6I01pN9zVww=='

// const token = 'wojiacloud'
// const aesKey = 'tjF4SjtKKpw66fwNHFKZKzzfrzzTeaQ8EJmzGjAPsin'

/**
 * 解密
 * @param encrypt
 * @param aesKey
 * @param appID
 */
// function decryptXML(encrypt, aesKey, appID) {}

// const signature = sha1(token, timestamp, nonce, encrypt)
// const data = decryptXML(encrypt, aesKey, appID)

// console.log(90, signature, data, 90)
