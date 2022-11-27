import { randomBytes } from 'crypto'
import { xmlDecrypt, xmlEncrypt } from './xmlParser'
import { aes256Decrypt, aes256Encrypt } from './aes256'
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
    async encryptXML(
        encrypt: string,
        signature: string,
        timestamp: string | number,
        nonce: string | number
    ) {
        const xml = await xmlEncrypt(encrypt, signature, timestamp, nonce)
        return xml
    }

    /**
     * decrypt XML string & return object
     *
     * @param data - xml data， eg. <xml><appid><![CDATA[xxxx]]></appid><encrypt>xxxx</encrypt></xml>
     * @returns xmData - xmData, eg. { encrypt: 'xxxx', appid: 'xxxx' }
     */
    async decryptXML(data: string) {
        // if data is xml string, parse it first
        if (!data.includes('<xml>')) {
            throw new Error('xml data invalid')
        }

        const xml = await xmlDecrypt(data)
        debug('decryptXML: ', xml)
        return xml as WeixinMessageXML['xml']
    }

    /**
     * encrypt
     * Base64Encode(AES256Encrypt[RandomString(16B) + ContentLength(4B) + Content + appID])
     *
     * @param data - xml data String, eg. <xml><AppId><![CDATA[xxxx]]></AppId>...<ComponentVerifyTicket>ticket@@@xxxx</ComponentVerifyTicket></xml>
     * @returns encrypt - encrypt string, eg. oVMc1Y6qP86YfAa.../QGgk503Q68Q==
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

        debug('encrypt: ', ciphered.toString('base64'))
        return ciphered.toString('base64')
    }

    /**
     * decrypt
     *
     * @param data - encrypt string, eg. oVMc1Y6qP86YfAa.../QGgk503Q68Q==
     * @param timestamp - timestamp
     * @param nonce - nonce
     * @returns xmData - xmData, eg. { data: <xml><AppId><![CDATA[xxxx]]></AppId>...<ComponentVerifyTicket>ticket@@@xxxx</ComponentVerifyTicket></xml>, appID: 'xxxx' }
     */
    async decrypt(
        data: string,
        timestamp: string | number,
        nonce: string | number
    ) {
        // if data is xml string, parse it first
        if (data.includes('<xml>')) {
            const xmlData = await this.decryptXML(data)
            data = xmlData.encrypt || ''
        }

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

        debug('decrypt:', {
            data: content.subarray(4, length + 4).toString(),
            appID: content.subarray(length + 4).toString()
        })
        return {
            data: content.subarray(4, length + 4).toString(),
            appID: content.subarray(length + 4).toString()
        }
    }
}

// export { WxCrypto, WxCrypto as default }
export default WxCrypto
