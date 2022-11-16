import { parseString, parseStringPromise } from 'xml2js'

export const decrypt = () => {
    return parseStringPromise()
}

export const decryptSync = (data, option) => {
    parseString(
        data,
        { explicitArray: false, ...option },
        (err: Error, result: string) => {
            if (err) throw err
            return result
        }
    )
}

export const encrypt = () => {
    return parseStringPromise()
}

export const encryptSync = () => {
    return parseString()
}

export default {
    decrypt,
    decryptSync,
    encrypt,
    encryptSync
}
