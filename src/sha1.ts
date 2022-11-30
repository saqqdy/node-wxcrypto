import { createHash } from 'crypto'

const debug = require('debug')('wxcrypto:sha1')

/**
 * sha1摘要算法
 *
 * @params args - 参数
 * @returns str - 返回加密后的字符串
 */
const sha1 = (...args: string[]): string => {
    debug(
        'sha1: ',
        args.sort(),
        createHash('sha1').update(args.sort().join('')).digest('hex')
    )
    return createHash('sha1').update(args.sort().join('')).digest('hex')
}

export { sha1, sha1 as default }
