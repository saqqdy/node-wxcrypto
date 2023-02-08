[index.md - v1.2.0](../README.md) / [Exports](../modules.md) / WxCrypto

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
- [token](WxCrypto.md#token)

### Methods

- [decrypt](WxCrypto.md#decrypt)
- [encrypt](WxCrypto.md#encrypt)

## Constructors

### constructor

• **new WxCrypto**(`token`, `encodingAESKey`, `appID`)

#### Parameters

| Name             | Type     |
| :--------------- | :------- |
| `token`          | `string` |
| `encodingAESKey` | `string` |
| `appID`          | `string` |

#### Defined in

[src/index.ts:62](https://github.com/saqqdy/node-wxcrypto/blob/567a8c9/src/index.ts#L62)

## Properties

### appID

• **appID**: `string`

#### Defined in

[src/index.ts:61](https://github.com/saqqdy/node-wxcrypto/blob/567a8c9/src/index.ts#L61)

---

### iv

• **iv**: `Buffer`

#### Defined in

[src/index.ts:60](https://github.com/saqqdy/node-wxcrypto/blob/567a8c9/src/index.ts#L60)

---

### key

• **key**: `Buffer`

#### Defined in

[src/index.ts:59](https://github.com/saqqdy/node-wxcrypto/blob/567a8c9/src/index.ts#L59)

---

### token

• **token**: `string`

#### Defined in

[src/index.ts:58](https://github.com/saqqdy/node-wxcrypto/blob/567a8c9/src/index.ts#L58)

## Methods

### decrypt

▸ **decrypt**(`data`, `timestamp`, `nonce`): `Promise`<`any`\>

decrypt

#### Parameters

| Name        | Type                 | Description                                          |
| :---------- | :------------------- | :--------------------------------------------------- |
| `data`      | `string`             | encrypt string, eg. oVMc1Y6qP86YfAa.../QGgk503Q68Q== |
| `timestamp` | `string` \| `number` | timestamp                                            |
| `nonce`     | `string` \| `number` | nonce                                                |

#### Returns

`Promise`<`any`\>

xml - xmData, eg. { ComponentVerifyTicket: 'xxxx', ..., AppId: 'xxxx' }

#### Defined in

[src/index.ts:121](https://github.com/saqqdy/node-wxcrypto/blob/567a8c9/src/index.ts#L121)

---

### encrypt

▸ **encrypt**(`data`): `Promise`<`string`\>

encrypt
Base64Encode(AES256Encrypt[RandomString(16B) + ContentLength(4B) + Content + appID])

#### Parameters

| Name   | Type                           | Description                                                                |
| :----- | :----------------------------- | :------------------------------------------------------------------------- |
| `data` | `Record`<`string`, `unknown`\> | xml data String, eg. { ComponentVerifyTicket: 'xxxx', ..., AppId: 'xxxx' } |

#### Returns

`Promise`<`string`\>

encrypt - encrypt string, eg. oVMc1Y6qP86YfAa.../QGgk503Q68Q==

#### Defined in

[src/index.ts:93](https://github.com/saqqdy/node-wxcrypto/blob/567a8c9/src/index.ts#L93)
