const debug = require('debug')('wxcrypto:convert')

export type Encoding = 'ascii' | 'utf8' | 'utf16le' | 'ucs2' | 'latin1' | 'base64' | 'binary'

/**
 * Buffer convert
 *
 * @params args - 参数
 * @returns result - 返回加密后的字符串
 */
const convert = (
	data: string,
	desEncoding: Encoding = 'base64',
	srcEncoding: Encoding = 'binary'
): string => {
	debug('convert: ', Buffer.from(data, srcEncoding).toString(desEncoding))
	return Buffer.from(data, srcEncoding).toString(desEncoding)
}

export { convert, convert as default }
