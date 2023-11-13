<div style="text-align: center;" align="center">

# node-wxcrypto

微信消息加解密 nodejs 版本

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
![typescript][typescript-url]
<!-- [![Test coverage][codecov-image]][codecov-url] -->
[![npm download][download-image]][download-url]
[![License][license-image]][license-url]

<!-- [![Sonar][sonar-image]][sonar-url] -->

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

### **[Documentation](https://www.saqqdy.com/node-wxcrypto)** • **[Change Log](./CHANGELOG.md)**

</div>

## 安装

```bash
# 使用pnpm
$ pnpm i node-wxcrypto

# 使用yarn
$ yarn add node-wxcrypto
```

## 使用

### 引入和使用

1. require 引入

```js
const { WxCrypto } = require('node-wxcrypto')

const wxCrypto = new WxCrypto(token, aesKey, appID, options)
const data = await wxCrypto.decrypt(encrypt, timestamp, nonce, options)
```

2. import 引入

```js
import { WxCrypto } from 'node-wxcrypto'

const wxCrypto = new WxCrypto(token, aesKey, appID, options)
const data = await wxCrypto.decrypt(encrypt, timestamp, nonce, options)
```

### 使用配置

> 在实例化和加解密方法均支持传入 options: `normalizeTags`, `buildXmlOptions`, `xmlOptions`，加解密方法里面传入的 options 优先级更高。

> `normalizeTags` 支持将 xml 属性由驼峰转下划线分隔的小写形式；`buildXmlOptions` 透传用于生成 xml 字符串的配置；`xmlOptions` 透传用于解析 xml 字符串的配置。

> 注意：`normalizeTags` 会全量覆盖 `xmlOptions` 里面的 `tagNameProcessors` 方法，如果想要自定义 `tagNameProcessors`，请不要传入 `normalizeTags`

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

## API说明

### class WxCrypto

- 使用：`new WxCrypto(token, aesKey, appID, options)`
- 参数：

<div class="table-prop">

| 参数    | 说明                                                                                              | 类型     | 可选值 | 必填 | 默认 |
| ------- | ------------------------------------------------------------------------------------------------- | -------- | ------ | ---- | ---- |
| token   | 消息校验Token，开发者在代替公众号或小程序接收到消息时，用此Token来校验消息                        | `String` | -      | 是   | -    |
| aesKey  | 消息加解密Key，在代替公众号或小程序收发消息过程中使用。必须是长度为43位的字符串，只能是字母和数字 | `String` | -      | 是   | -    |
| appID   | 小程序appID                                                                                       | `String` | -      | 是   | -    |
| options | Options                                                                                           | `Object` | -      | 否   | -    |

</div>

- 示例：

```ts
const wxCrypto = new WxCrypto(token, aesKey, appID, options)
```

### function PKCS7Encode

- 使用：`PKCS7Encode(data)`
- 参数：

<div class="table-prop">

| 参数 | 说明       | 类型     | 可选值 | 必填 | 默认 |
| ---- | ---------- | -------- | ------ | ---- | ---- |
| data | Buffer数据 | `Buffer` | -      | 是   | -    |

</div>

- 示例：

```ts
const result = PKCS7Encode(data)
// Buffer
```

### function PKCS7Decode

- 使用：`PKCS7Decode(data)`
- 参数：

<div class="table-prop">

| 参数 | 说明       | 类型     | 可选值 | 必填 | 默认 |
| ---- | ---------- | -------- | ------ | ---- | ---- |
| data | Buffer数据 | `Buffer` | -      | 是   | -    |

</div>

- 示例：

```ts
const result = PKCS7Decode(data)
// Buffer
```

### function aes256Encrypt

- 使用：`aes256Encrypt(algorithm, key, iv, inputEncoding?, outputEncoding?, options?)`
- 参数：

<div class="table-prop">

| 参数           | 说明                      | 类型               | 可选值 | 必填 | 默认 |
| -------------- | ------------------------- | ------------------ | ------ | ---- | ---- |
| algorithm      | algorithm buffer data     | `Buffer[]`         | -      | 是   | -    |
| key            | AESKey                    | `Buffer`           | -      | 是   | -    |
| iv             | iv                        | `Buffer`           | -      | 是   | -    |
| inputEncoding  | encoding                  | `Encoding`         | -      | 否   | -    |
| outputEncoding | encoding                  | `Encoding`         | -      | 否   | -    |
| options        | options of createCipheriv | `CipherGCMOptions` | -      | 否   | -    |

</div>

- 示例：

```ts
const result = aes256Encrypt(algorithm, key, iv)
// string
```

### function aes256Decrypt

- 使用：`aes256Decrypt(algorithm, key, iv, inputEncoding?, outputEncoding?, options?)`
- 参数：

<div class="table-prop">

| 参数           | 说明                        | 类型               | 可选值 | 必填 | 默认 |
| -------------- | --------------------------- | ------------------ | ------ | ---- | ---- |
| algorithm      | algorithm data              | `String`           | -      | 是   | -    |
| key            | encodingAESKey              | `Buffer`           | -      | 是   | -    |
| iv             | iv                          | `Buffer`           | -      | 是   | -    |
| inputEncoding  | encoding                    | `Encoding`         | -      | 否   | -    |
| outputEncoding | encoding                    | `Encoding`         | -      | 否   | -    |
| options        | options of stream.transform | `CipherCCMOptions` | -      | 否   | -    |

</div>

- 示例：

```ts
const result = aes256Decrypt(algorithm, key, iv)
// string
```

### function buildXML buildXMLSync

- 使用：`buildXML(data, options?), buildXMLSync(data, options?, callback?)`
- 参数：

<div class="table-prop">

| 参数     | 说明        | 类型              | 可选值 | 必填 | 默认 |
| -------- | ----------- | ----------------- | ------ | ---- | ---- |
| data     | 数据        | `Object`          | -      | 是   | -    |
| options  | xml生成配置 | `BuildXMLOptions` | -      | 否   | -    |
| callback | 回调方法    | `Function`        | -      | 否   | -    |

</div>

- 示例：

```ts
const result = buildXML(data)
// string
```

### function parseXML parseXMLSync

- 使用：`parseXML(data, options?), parseXMLSync(data, options?, callback?)`
- 参数：

<div class="table-prop">

| 参数     | 说明        | 类型                  | 可选值 | 必填 | 默认 |
| -------- | ----------- | --------------------- | ------ | ---- | ---- |
| data     | 数据        | `convertableToString` | -      | 是   | -    |
| options  | xml解析配置 | `ParserXMLOptions`    | -      | 否   | -    |
| callback | 回调方法    | `Function`            | -      | 否   | -    |

</div>

- 示例：

```ts
const result = parseXML(data)
// string
```

### function sha1

- 使用：`sha1(...data)`
- 参数：

<div class="table-prop">

| 参数    | 说明 | 类型       | 可选值 | 必填 | 默认 |
| ------- | ---- | ---------- | ------ | ---- | ---- |
| ...data | 数据 | `string[]` | -      | 是   | -    |

</div>

- 示例：

```ts
const result = sha1(data)
// string
```

## 类型

1. [Interface Options](https://www.saqqdy.com/node-wxcrypto/interfaces/Options.html)
2. [Interface BuildXMLOptions](https://www.saqqdy.com/node-wxcrypto/interfaces/BuildXMLOptions.html)
3. [Class WxCrypto](https://www.saqqdy.com/node-wxcrypto/classes/WxCrypto.html)
4. [Variable default](https://www.saqqdy.com/node-wxcrypto/variables/default.html)

## 问题和支持

Please open an issue [here](https://github.com/saqqdy/node-wxcrypto/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/node-wxcrypto.svg?style=flat-square
[npm-url]: https://npmjs.org/package/node-wxcrypto
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/node-wxcrypto/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/node-wxcrypto&utm_campaign=Badge_Grade
[typescript-url]: https://badgen.net/badge/icon/typescript?icon=typescript&label
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/node-wxcrypto.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/node-wxcrypto?branch=master
[download-image]: https://img.shields.io/npm/dm/node-wxcrypto.svg?style=flat-square
[download-url]: https://npmjs.org/package/node-wxcrypto
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_node-wxcrypto
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_node-wxcrypto
