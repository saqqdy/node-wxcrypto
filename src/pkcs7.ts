/**
 * PKCS7 decode
 *
 * @params data - Decrypted plaintext
 * @returns buffer - deleted Buffer
 */
export const PKCS7Decode = (data: Buffer): Buffer => {
    let pad = data[data.length - 1]
    if (pad < 1 || pad > 32) {
        pad = 0
    }

    return data.subarray(0, data.length - pad)
}

/**
 * PKCS7 encode
 *
 * @params data - Plaintext that needs to be filled in
 * @returns buffer - filled Buffer
 */
export const PKCS7Encode = (data: Buffer): Buffer => {
    const size = 32
    const len = data.length
    const padAmount = size - (len % size)
    const result = Buffer.alloc(padAmount)
    result.fill(padAmount)

    return Buffer.concat([data, result])
}

export default { PKCS7Decode, PKCS7Encode }
