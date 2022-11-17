import { type CipherCCMOptions, type Encoding, createDecipheriv } from 'crypto'
import convert from './convert'

/**
 * aes256 encrypt function
 *
 * @params args - 参数
 * @returns str - 返回加密后的字符串
 */
export const aes256Encrypt = (): string => {
    return ''
}

/**
 * aes256 decrypt function
 *
 * @params algorithm - algorithm data
 * @params aesKey - aesKey
 * @params inputEncoding - The encoding of the data.
 * @params outputEncoding - The encoding of the return value.
 * @params options - stream.transform options
 * @returns str - return string
 */
export const aes256Decrypt = (
    algorithm: string,
    aesKey: string,
    inputEncoding: Encoding = 'base64',
    outputEncoding: Encoding = 'utf8',
    options?: CipherCCMOptions
): string => {
    const encodingAESKey = convert(aesKey, 'base64') // Buffer.from(`${aesKey}=`, 'base64')
    const cipher = createDecipheriv(
        'aes-256-cbc',
        encodingAESKey,
        encodingAESKey.slice(0, 16),
        options
    )
    // cipher.setAutoPadding(false) // 是否取消自动填充 不取消
    return `${cipher.update(
        algorithm,
        inputEncoding,
        outputEncoding
    )}${cipher.final(outputEncoding)}`
}

export default { aes256Encrypt, aes256Decrypt }
