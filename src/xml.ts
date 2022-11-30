import {
    Builder,
    type BuilderOptions,
    type ParserOptions,
    type convertableToString,
    parseString,
    parseStringPromise
} from 'xml2js'

const debug = require('debug')('wxcrypto:xmlParser')

export interface BuildXMLOptions extends BuilderOptions {
    //
}

/**
 * parse xml promise
 *
 * @param {object} data xmlString
 * @param {object} options ParserOptions
 * @returns {Promise<object>} xml object
 */
export const parseXML = (
    data: convertableToString,
    options: ParserOptions = {}
) => {
    return parseStringPromise(data, { explicitArray: false, ...options }).then(
        ({ xml = {} }) => {
            debug('parseXML: ', xml)
            return xml
        }
    )
}

/**
 * build xml sync
 *
 * @param {object} data xmlString
 * @param {object,function} options callback function or ParserOptions
 * @param {function} callback exec function on build successful
 * @returns {string} xml object
 */
export const parseXMLSync = (
    data: convertableToString,
    options: ParserOptions = {},
    callback: Function
) => {
    parseString(
        data,
        { explicitArray: false, ...options },
        (err: Error | null, result: string) => {
            if (err) throw err
            debug('parseXMLSync: ', result)
            callback(result)
            return result
        }
    )
}

/**
 * build xml
 *
 * @param {object} data xml object
 * @param {object} options xml Builder options
 * @returns {Promise<string>} xmlString
 */
export const buildXML = (
    data: Record<string, unknown>,
    options: BuildXMLOptions = {}
) => {
    const builder = new Builder({
        cdata: true,
        headless: true,
        rootName: 'xml',
        ...options
    })
    const xmlString = builder.buildObject(data)
    debug('buildXML: ', true)
    return Promise.resolve(xmlString)
}

/**
 * build xml sync
 *
 * @param {object} data xml object
 * @param {object,function} options callback function or xml Builder options
 * @param {function} callback exec function on build successful
 * @returns {string} xmlString
 */
export const buildXMLSync = (
    data: Record<string, unknown>,
    options: BuildXMLOptions | Function = {},
    callback: Function
) => {
    if (typeof options === 'function') callback = options
    const builder = new Builder({
        cdata: true,
        headless: true,
        rootName: 'xml',
        ...options
    })
    const xmlString = builder.buildObject(data)
    debug('buildXMLSync: ', true)
    callback(xmlString)
    return xmlString
}

export default {
    parseXML,
    parseXMLSync,
    buildXML,
    buildXMLSync
}
