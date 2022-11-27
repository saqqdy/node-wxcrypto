import {
    type ParserOptions,
    type convertableToString,
    parseString,
    parseStringPromise
} from 'xml2js'

export const xmlDecrypt = (
    data: convertableToString,
    options: ParserOptions = {}
) => {
    return parseStringPromise(data, { explicitArray: false, ...options }).then(
        ({ xml = {} }) => xml
    )
}

export const xmlDecryptSync = (
    data: convertableToString,
    options: ParserOptions = {}
) => {
    parseString(
        data,
        { explicitArray: false, ...options },
        (err: Error | null, result: string) => {
            if (err) throw err
            console.dir(result)
            return result
        }
    )
}

export const xmlEncrypt = (
    encrypt: string,
    signature: string,
    timestamp: string | number,
    nonce: string | number
) =>
    Promise.resolve(`<xml>
<Encrypt><![CDATA[${encrypt}]]></Encrypt>
<MsgSignature><![CDATA[${signature}]]></MsgSignature>
<TimeStamp>${timestamp}</TimeStamp>
<Nonce><![CDATA[${nonce}]]></Nonce>
</xml>`)

/**
 * 生成密文
 *
 * @param encrypt
 * @param signature
 * @param timestamp
 * @param nonce
 * @returns {string}
 */
export const xmlEncryptSync = (
    encrypt: string,
    signature: string,
    timestamp: string | number,
    nonce: string | number
) => `<xml>
<Encrypt><![CDATA[${encrypt}]]></Encrypt>
<MsgSignature><![CDATA[${signature}]]></MsgSignature>
<TimeStamp>${timestamp}</TimeStamp>
<Nonce><![CDATA[${nonce}]]></Nonce>
</xml>`

export default {
    xmlDecrypt,
    xmlDecryptSync,
    xmlEncrypt,
    xmlEncryptSync
}
