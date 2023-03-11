import { randomBytes } from 'crypto'
import {
	type BuildXMLOptions,
	type ParserXMLOptions,
	buildXML,
	buildXMLSync,
	parseXML,
	parseXMLSync
} from './xml'
import { aes256Decrypt, aes256Encrypt } from './aes256'
// import { PKCS7Decode, PKCS7Encode } from './pkcs7'
import sha1 from './sha1'

const debug = require('debug')('wxcrypto')

export interface Options {
	// Convert camel to underscore delimited
	normalizeTags?: boolean
	// see: https://github.com/Leonidas-from-XIV/node-xml2js/blob/master/README.md#options-for-the-builder-class
	buildXmlOptions?: BuildXMLOptions
	// see: https://github.com/Leonidas-from-XIV/node-xml2js/blob/master/README.md#options
	xmlOptions?: ParserXMLOptions
}

export interface withXMLProp<T> {
	xml: T
}

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
	options: Options
	constructor(token: string, encodingAESKey: string, appID: string, options: Options = {}) {
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
		this.iv = AESKey.subarray(0, 16)
		this.options = options
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
	 * mergeXmlOptions
	 *
	 * @param options - options
	 * @returns xml - xmData, eg. \{ ComponentVerifyTicket: 'xxxx', ..., AppId: 'xxxx' \}
	 */
	mergeXmlOptions(options: Options = {}) {
		// normalize tags
		if (options.normalizeTags) {
			const sep = typeof options.normalizeTags === 'string' ? options.normalizeTags : '_'
			if (!options.xmlOptions) options.xmlOptions = {}
			options.xmlOptions.tagNameProcessors = [
				name =>
					name
						.replace(/([A-Z]+)/g, sep + '$1')
						.replace(new RegExp('^' + sep), '')
						.toLocaleLowerCase()
			]
		}
		return options.xmlOptions || this.options.xmlOptions
	}

	/**
	 * encrypt
	 * Base64Encode(AES256Encrypt[RandomString(16B) + ContentLength(4B) + Content + appID])
	 *
	 * @param data - xml data String, eg. \{ ComponentVerifyTicket: 'xxxx', ..., AppId: 'xxxx' \}
	 * @param options - options
	 * @returns encrypt - encrypt string, eg. oVMc1Y6qP86YfAa.../QGgk503Q68Q==
	 */
	async encrypt(data: Record<string, unknown>, options: Options = {}) {
		const xmlString = await buildXML(
			data,
			options.buildXmlOptions || this.options.buildXmlOptions
		)
		// 16B RandomString
		const randomStr = randomBytes(16)
		const content = Buffer.from(xmlString)
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
	 * @param options - options
	 * @returns xml - xmData, eg. \{ ComponentVerifyTicket: 'xxxx', ..., AppId: 'xxxx' \}
	 */
	async decrypt(
		data: string,
		timestamp: string | number,
		nonce: string | number,
		options: Options = {}
	) {
		// unused
		const signature = sha1(this.token, String(timestamp), String(nonce), data)
		// console.info('signature: ', signature)
		debug('signature', signature)

		const deciphered = aes256Decrypt(data, this.key, this.iv)
		// AES256Encrypt => [RandomString(16B) + ContentLength(4B) + Content + CorpID]
		// Remove 16b random string
		const content = deciphered.subarray(16)
		const length = content.subarray(0, 4).readUInt32BE(0)

		const decryptedXML = content.subarray(4, length + 4).toString()
		const decryptedAppID = content.subarray(length + 4).toString()
		// parsing xml
		const xml = parseXML(decryptedXML, this.mergeXmlOptions(options))

		debug('decrypt:xml', xml)
		debug('decrypt:appID', decryptedAppID)
		return xml
	}
}

export {
	type BuildXMLOptions,
	type ParserXMLOptions,
	aes256Decrypt,
	aes256Encrypt,
	// PKCS7Decode,
	// PKCS7Encode,
	sha1,
	buildXML,
	buildXMLSync,
	parseXML,
	parseXMLSync,
	WxCrypto,
	WxCrypto as default
}
