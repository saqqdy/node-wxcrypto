# API说明

## class WxCrypto

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

## function PKCS7Encode

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

## function PKCS7Decode

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

## function aes256Encrypt

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

## function aes256Decrypt

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

## function buildXML buildXMLSync

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

## function parseXML parseXMLSync

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

## function sha1

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
