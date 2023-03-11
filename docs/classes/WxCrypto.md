[index.md - v2.0.0](../README.md) / [Exports](../modules.md) / WxCrypto

# Class: WxCrypto

微信消息加解密 nodejs 版本

**`Example`**

```
const WxCrypto = require('node-wxcrypto');
const wxCrypto = new WxCrypto(token, encodingAESKey, appID);

var [err, encryptedXML] = wx.encrypt(xml, timestamp, nonce);

var [err, decryptedXML] = wx.decrypt(signature, timestamp, nonce, encrypted);
```

## Table of contents

### Constructors

- [constructor](WxCrypto.md#constructor)

### Properties

- [appID](WxCrypto.md#appid)
- [iv](WxCrypto.md#iv)
- [key](WxCrypto.md#key)
- [options](WxCrypto.md#options)
- [token](WxCrypto.md#token)

### Methods

- [decrypt](WxCrypto.md#decrypt)
- [encrypt](WxCrypto.md#encrypt)
- [mergeXmlOptions](WxCrypto.md#mergexmloptions)

## Constructors

### constructor

• **new WxCrypto**(`token`, `encodingAESKey`, `appID`, `options?`)

#### Parameters

| Name             | Type                                  |
| :--------------- | :------------------------------------ |
| `token`          | `string`                              |
| `encodingAESKey` | `string`                              |
| `appID`          | `string`                              |
| `options`        | [`Options`](../interfaces/Options.md) |

#### Defined in

[src/index.ts:48](https://github.com/saqqdy/node-wxcrypto/blob/82369d0/src/index.ts#L48)

## Properties

### appID

• **appID**: `string`

#### Defined in

[src/index.ts:46](https://github.com/saqqdy/node-wxcrypto/blob/82369d0/src/index.ts#L46)

---

### iv

• **iv**: `Buffer`

#### Defined in

[src/index.ts:45](https://github.com/saqqdy/node-wxcrypto/blob/82369d0/src/index.ts#L45)

---

### key

• **key**: `Buffer`

#### Defined in

[src/index.ts:44](https://github.com/saqqdy/node-wxcrypto/blob/82369d0/src/index.ts#L44)

---

### options

• **options**: [`Options`](../interfaces/Options.md)

#### Defined in

[src/index.ts:47](https://github.com/saqqdy/node-wxcrypto/blob/82369d0/src/index.ts#L47)

---

### token

• **token**: `string`

#### Defined in

[src/index.ts:43](https://github.com/saqqdy/node-wxcrypto/blob/82369d0/src/index.ts#L43)

## Methods

### decrypt

▸ **decrypt**(`data`, `timestamp`, `nonce`, `options?`): `Promise`<`any`\>

decrypt

#### Parameters

| Name        | Type                                  | Description                                          |
| :---------- | :------------------------------------ | :--------------------------------------------------- |
| `data`      | `string`                              | encrypt string, eg. oVMc1Y6qP86YfAa.../QGgk503Q68Q== |
| `timestamp` | `string` \| `number`                  | timestamp                                            |
| `nonce`     | `string` \| `number`                  | nonce                                                |
| `options`   | [`Options`](../interfaces/Options.md) | options                                              |

#### Returns

`Promise`<`any`\>

xml - xmData, eg. { ComponentVerifyTicket: 'xxxx', ..., AppId: 'xxxx' }

#### Defined in

[src/index.ts:135](https://github.com/saqqdy/node-wxcrypto/blob/82369d0/src/index.ts#L135)

---

### encrypt

▸ **encrypt**(`data`, `options?`): `Promise`<`string`\>

encrypt
Base64Encode(AES256Encrypt[RandomString(16B) + ContentLength(4B) + Content + appID])

#### Parameters

| Name      | Type                                  | Description                                                                |
| :-------- | :------------------------------------ | :------------------------------------------------------------------------- |
| `data`    | `Record`<`string`, `unknown`\>        | xml data String, eg. { ComponentVerifyTicket: 'xxxx', ..., AppId: 'xxxx' } |
| `options` | [`Options`](../interfaces/Options.md) | options                                                                    |

#### Returns

`Promise`<`string`\>

encrypt - encrypt string, eg. oVMc1Y6qP86YfAa.../QGgk503Q68Q==

#### Defined in

[src/index.ts:103](https://github.com/saqqdy/node-wxcrypto/blob/82369d0/src/index.ts#L103)

---

### mergeXmlOptions

▸ **mergeXmlOptions**(`options?`): `undefined` \| `ParserOptions`

mergeXmlOptions

#### Parameters

| Name      | Type                                  | Description |
| :-------- | :------------------------------------ | :---------- |
| `options` | [`Options`](../interfaces/Options.md) | options     |

#### Returns

`undefined` \| `ParserOptions`

xml - xmData, eg. { ComponentVerifyTicket: 'xxxx', ..., AppId: 'xxxx' }

#### Defined in

[src/index.ts:79](https://github.com/saqqdy/node-wxcrypto/blob/82369d0/src/index.ts#L79)
