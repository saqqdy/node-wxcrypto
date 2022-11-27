import { randomBytes } from 'crypto'
import { decrypt } from './xmlParser'
import { aes256Decrypt, aes256Encrypt } from './aes256'
import { PKCS7Decode, PKCS7Encode } from './pkcs7'
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
 * const wxCrypto = new WxCrypto(token, encodingAESKey, appID);
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
    key: Buffer
    iv: Buffer
    appID: string
    constructor(token: string, encodingAESKey: string, appID: string) {
        if (!token || !encodingAESKey || !appID) {
            throw new Error('please check arguments')
        }
        const AESKey = Buffer.from(encodingAESKey + '=', 'base64')
        if (AESKey.length !== 32) {
            throw new Error('encodingAESKey invalid')
        }
        this.token = token
        this.appID = appID
        this.key = AESKey
        this.iv = AESKey.slice(0, 16)
        debug(
            'weixin crypto class initialize with token=',
            token,
            'key=',
            AESKey,
            'appID=',
            appID,
            'iv=',
            this.iv
        )
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
    // async decryptXML(
    //     algorithm: string,
    //     timestamp: string | number,
    //     nonce: string | number
    // ) {
    //     // if algorithm is xml string, parse it first
    //     if (algorithm.includes('<xml>')) {
    //         const xmlData = this.parseWeixinXML(algorithm)
    //         algorithm = xmlData.xml.encrypt || ''
    //     }
    //     // unused
    //     const signature = sha1(
    //         this.token,
    //         String(timestamp),
    //         String(nonce),
    //         algorithm
    //     )
    //     // console.info('signature: ', signature)
    //     debug('signature', signature)

    //     const message = aes256Decrypt(algorithm, this.key)
    //     const data = await decrypt(
    //         message.substring(20, message.lastIndexOf('>') + 1) as string
    //     )

    //     const nonceStr = message.substring(0, 16)
    //     const len = message.substring(16, 20)
    //     const corpID = message.substring(message.lastIndexOf('>') + 1)
    //     debug(
    //         'message: ',
    //         message,
    //         'nonceStr: ',
    //         nonceStr,
    //         'len: ',
    //         len,
    //         'corpID: ',
    //         corpID
    //     )
    //     return data
    // }

    /**
     * encrypt
     * Base64Encode(AES256Encrypt[RandomString(16B) + ContentLength(4B) + Content + appID])
     *
     * @param data - xml data String, eg. <xml><AppId><![CDATA[xxxx]]></AppId>...</xml>
     * @param timestamp - timestamp
     * @param nonce - nonce
     * @returns xmData - xmData
     */
    async encrypt(data: string) {
        // 16B RandomString
        const randomStr = randomBytes(16)
        const content = Buffer.from(data)
        const appID = Buffer.from(this.appID)
        // Get the network byte order of the content length of 4B
        const contentLength = Buffer.alloc(4)
        contentLength.writeUInt32BE(content.length, 0)

        const ciphered = aes256Encrypt(
            [randomStr, contentLength, content, appID],
            this.key,
            this.iv
        )

        return ciphered.toString('base64')
    }

    /**
     * decrypt
     *
     * @param data - encrypt string, eg. oVMc1Y6qP86YfAa.../QGgk503Q68Q==
     * @param timestamp - timestamp
     * @param nonce - nonce
     * @returns xmData - xmData, eg. { data: <xml><AppId><![CDATA[xxxx]]></AppId>...</xml>, appID: 'xxxx' }
     */
    async decrypt(
        data: string,
        timestamp: string | number,
        nonce: string | number
    ) {
        // unused
        const signature = sha1(
            this.token,
            String(timestamp),
            String(nonce),
            data
        )
        // console.info('signature: ', signature)
        debug('signature', signature)

        const deciphered = aes256Decrypt(data, this.key, this.iv)
        // AES256Encrypt => [RandomString(16B) + ContentLength(4B) + Content + CorpID]
        // Remove 16b random string
        const content = deciphered.subarray(16)
        const length = content.subarray(0, 4).readUInt32BE(0)

        return {
            data: content.subarray(4, length + 4).toString(),
            appID: content.subarray(length + 4).toString()
        }
    }
}

// export { WxCrypto, WxCrypto as default }
export default WxCrypto
