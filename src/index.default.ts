import WxCrypto from './WxCrypto'
import { aes256Decrypt, aes256Encrypt } from './aes256'
// import { PKCS7Decode, PKCS7Encode } from './pkcs7'
import sha1 from './sha1'
import { buildXML, buildXMLSync, parseXML, parseXMLSync } from './xml'

export default {
	// PKCS7Decode,
	// PKCS7Encode,
	WxCrypto,
	aes256Decrypt,
	aes256Encrypt,
	buildXML,
	buildXMLSync,
	parseXML,
	parseXMLSync,
	sha1,
	version: '__VERSION__'
}
