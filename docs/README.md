index.md - v1.2.0 / [Exports](modules.md)

<div style="text-align: center;" align="center">

# node-wxcrypto

微信消息加解密 nodejs 版本

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![build status][travis-image]][travis-url]
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

# 使用npm
$ npm i node-wxcrypto --save
```

## 使用

require 引入

```js
const { WxCrypto } = require('node-wxcrypto')

/**
 * class WxCrypto
 *
 * @param {string} token token
 * @param {string} aesKey 43位
 * @param {string} appID appID
 * @return {Object} WxCrypto instance
 */
const wxCrypto = new WxCrypto(token, aesKey, appID)

/**
 * decrypt data
 *
 * @param {string} encrypt encrypt data
 * @param {string} timestamp timestamp
 * @param {string} nonce nonce
 * @return {Object} decrypt data
 */
const data = await wxCrypto.decrypt(encrypt, timestamp, nonce)
```

import 引入

```js
import { WxCrypto } from 'node-wxcrypto'

/**
 * class WxCrypto
 *
 * @param {string} token token
 * @param {string} aesKey 43位
 * @param {string} appID appID
 * @return {Object} WxCrypto instance
 */
const wxCrypto = new WxCrypto(token, aesKey, appID)

/**
 * decrypt data
 *
 * @param {string} encrypt encrypt data
 * @param {string} timestamp timestamp
 * @param {string} nonce nonce
 * @return {Object} decrypt data
 */
const data = await wxCrypto.decrypt(encrypt, timestamp, nonce)
```

## 问题和支持

Please open an issue [here](https://github.com/saqqdy/node-wxcrypto/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/node-wxcrypto.svg?style=flat-square
[npm-url]: https://npmjs.org/package/node-wxcrypto
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/node-wxcrypto/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/node-wxcrypto&utm_campaign=Badge_Grade
[travis-image]: https://travis-ci.com/saqqdy/node-wxcrypto.svg?branch=master
[travis-url]: https://travis-ci.com/saqqdy/node-wxcrypto
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/node-wxcrypto.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/node-wxcrypto?branch=master
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_node-wxcrypto
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_node-wxcrypto
