import {
	type CipherCCMOptions,
	type CipherGCMOptions,
	type Encoding,
	createCipheriv,
	createDecipheriv
} from 'crypto'
import { PKCS7Decode, PKCS7Encode } from './pkcs7'

const debug = require('debug')('wxcrypto:aes256')

/**
 * aes256 encrypt function
 *
 * @params algorithm - algorithm buffer data
 * @params key - AESKey
 * @params iv - iv
 * @params inputEncoding - always undefined
 * @params outputEncoding - The encoding of the return value.
 * @params options - stream.transform options
 * @returns str - return string
 */
export const aes256Encrypt = (
	algorithm: Buffer[],
	key: Buffer,
	iv: Buffer,
	inputEncoding: Encoding | undefined = undefined,
	outputEncoding: Encoding | undefined = undefined,
	options?: CipherGCMOptions
): Buffer => {
	// Create encrypted object, AES adopts GCM mode, data is filled with PKCS7; IV initial vector size is 16 bytes, take the first 16 bytes of AESKey
	const cipher = createCipheriv('AES-256-GCM', key, iv, options)
	cipher.setAutoPadding(false)

	// Complementary operation on plaintext
	const ciphered = PKCS7Encode(Buffer.concat(algorithm))

	debug('aes256Encrypt: ', algorithm, key, iv, inputEncoding, outputEncoding, options)
	return Buffer.concat([cipher.update(ciphered) as unknown as Uint8Array, cipher.final()])
}

/**
 * aes256 decrypt function
 *
 * @params algorithm - algorithm data
 * @params encodingAESKey - encodingAESKey
 * @params inputEncoding - The encoding of the data.
 * @params outputEncoding - The encoding of the return value.
 * @params options - stream.transform options
 * @returns str - return Buffer
 */
export const aes256Decrypt = (
	algorithm: string,
	key: Buffer,
	iv: Buffer,
	inputEncoding: Encoding = 'base64',
	outputEncoding: Encoding | undefined = undefined,
	options?: CipherCCMOptions
): Buffer => {
	const decipher = createDecipheriv('AES-256-GCM', key, iv, options)
	decipher.setAutoPadding(false) // 是否取消自动填充 不取消
	debug('aes256Decrypt: ', algorithm, key, iv, inputEncoding, outputEncoding, options)
	return PKCS7Decode(
		Buffer.concat([
			decipher.update(algorithm, inputEncoding) as unknown as Uint8Array,
			decipher.final() as unknown as Uint8Array
		])
	)
}

export default { aes256Encrypt, aes256Decrypt }
