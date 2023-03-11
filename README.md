<div style="text-align: center;" align="center">

# node-wxcrypto

微信消息加解密 nodejs 版本

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Test coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

## **完整文档请查阅： [API 完整文档](./docs/modules.md)**

## 安装

```bash
# 使用pnpm
$ pnpm i node-wxcrypto

# 使用yarn
$ yarn add node-wxcrypto
```

## 使用

> 在实例化和加解密方法均支持传入 options: `normalizeTags`, `buildXmlOptions`, `xmlOptions`，加解密方法里面传入的 options 优先级更高。

> `normalizeTags` 支持将 xml 属性由驼峰转下划线分隔的小写形式；`buildXmlOptions` 透传用于生成 xml 字符串的配置；`xmlOptions` 透传用于解析 xml 字符串的配置。

> 注意：`normalizeTags` 会全量覆盖 `xmlOptions` 里面的 `tagNameProcessors` 方法，如果想要自定义 `tagNameProcessors`，请不要传入 `normalizeTags`

### 引入和使用

1. require 引入

```js
const { WxCrypto } = require('node-wxcrypto')

/**
 * class WxCrypto
 *
 * @param {string} token 消息校验Token，开发者在代替公众号或小程序接收到消息时，用此Token来校验消息。
 * @param {string} aesKey 消息加解密Key，在代替公众号或小程序收发消息过程中使用。必须是长度为43位的字符串，只能是字母和数字。
 * @param {string} appID 小程序appID
 * @param {object} options Options
 * @return {Object} WxCrypto instance
 */
const wxCrypto = new WxCrypto(token, aesKey, appID, options)

/**
 * decrypt data
 *
 * @param {string} encrypt encrypt data
 * @param {string} timestamp timestamp
 * @param {string} nonce nonce
 * @param {object} options Options
 * @return {Object} decrypt data
 */
const data = await wxCrypto.decrypt(encrypt, timestamp, nonce, options)
```

2. import 引入

```js
import {
  type BuildXMLOptions,
  type ParserXMLOptions,
  WxCrypto,
  aes256Decrypt,
  aes256Encrypt,
  buildXML,
  buildXMLSync,
  parseXML,
  parseXMLSync,
  sha1
} from 'node-wxcrypto'

const data = await wxCrypto.decrypt(encrypt, timestamp, nonce, options)
```

### 使用配置

持将 xml 属性由驼峰转下划线分隔的小写形式：`ComponentVerifyTicket => component_verify_ticket`

```js
// normalizeTags可传入布尔值或者字符串，传入字符串时使用该字符串分隔，例如：normalizeTags = "__"，得到：`ComponentVerifyTicket => component__verify__ticket`
const wxCrypto = new WxCrypto(token, aesKey, appID, {
  normalizeTags: true,
  buildXmlOptions: {}, // 透传用于生成 xml 字符串的配置
  xmlOptions: {} // 透传用于解析 xml 字符串的配置
})
const data = await wxCrypto.decrypt(encrypt, timestamp, nonce, options)
```

## 问题和支持

Please open an issue [here](https://github.com/saqqdy/node-wxcrypto/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/node-wxcrypto.svg?style=flat-square
[npm-url]: https://npmjs.org/package/node-wxcrypto
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/node-wxcrypto/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/node-wxcrypto&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/node-wxcrypto.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/node-wxcrypto?branch=master
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_node-wxcrypto
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_node-wxcrypto
