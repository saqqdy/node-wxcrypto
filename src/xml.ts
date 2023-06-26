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
	cdata: boolean
	headless: boolean
	rootName: 'xml' | string
}

export type ParserXMLOptions = ParserOptions

/**
 * parse xml promise
 *
 * @param data - xmlString
 * @param options - ParserXMLOptions
 * @returns result - xml object
 */
export const parseXML = (data: convertableToString, options: ParserXMLOptions = {}) => {
	return parseStringPromise(data, { explicitArray: false, ...options }).then(({ xml = {} }) => {
		debug('parseXML: ', xml)
		return xml
	})
}

/**
 * build xml sync
 *
 * @param data - xmlString
 * @param options - callback function or ParserXMLOptions
 * @param callback - exec function on build successful
 * @returns result - xml object
 */
export const parseXMLSync = (
	data: convertableToString,
	options: ParserXMLOptions = {},
	callback: Function
) => {
	parseString(data, { explicitArray: false, ...options }, (err: Error | null, result: string) => {
		if (err) throw err
		debug('parseXMLSync: ', result)
		callback(result)
		return result
	})
}

/**
 * build xml
 *
 * @param data - xml object
 * @param options - xml Builder options
 * @returns result - xmlString
 */
export const buildXML = (
	data: Record<string, unknown>,
	options?: BuildXMLOptions
): Promise<string> => {
	const builder = new Builder({
		cdata: true,
		headless: true,
		rootName: 'xml',
		...(options || {})
	})
	const xmlString = builder.buildObject(data)
	debug('buildXML: ', true)
	return Promise.resolve(xmlString)
}

/**
 * build xml sync
 *
 * @param data - xml object
 * @param options - callback function or xml Builder options
 * @param callback - exec function on build successful
 * @returns result - xmlString
 */
export const buildXMLSync = (
	data: Record<string, unknown>,
	options?: BuildXMLOptions | Function,
	callback?: Function
) => {
	if (typeof options === 'function') callback = options
	const builder = new Builder({
		cdata: true,
		headless: true,
		rootName: 'xml',
		...(options || {})
	})
	const xmlString = builder.buildObject(data)
	debug('buildXMLSync: ', true)
	callback && callback(xmlString)
	return xmlString
}
