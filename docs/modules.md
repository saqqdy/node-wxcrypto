[index.md - v1.1.1](README.md) / Exports

# index.md - v1.1.1

## Table of contents

### References

- [default](modules.md#default)

### Classes

- [WxCrypto](classes/WxCrypto.md)

### Interfaces

- [BuildXMLOptions](interfaces/BuildXMLOptions.md)
- [WeixinMessageData](interfaces/WeixinMessageData.md)
- [WeixinVerifyData](interfaces/WeixinVerifyData.md)
- [withXMLProp](interfaces/withXMLProp.md)

### Type Aliases

- [WeixinMessageXML](modules.md#weixinmessagexml)
- [WeixinVerifyMessageXMLData](modules.md#weixinverifymessagexmldata)

### Functions

- [aes256Decrypt](modules.md#aes256decrypt)
- [aes256Encrypt](modules.md#aes256encrypt)
- [buildXML](modules.md#buildxml)
- [parseXML](modules.md#parsexml)
- [sha1](modules.md#sha1)

## References

### default

Renames and re-exports [WxCrypto](classes/WxCrypto.md)

## Type Aliases

### WeixinMessageXML

Ƭ **WeixinMessageXML**: [`withXMLProp`](interfaces/withXMLProp.md)<`Record`<`string`, `unknown`\> & { `appid`: `string` ; `encrypt`: `string` }\>

#### Defined in

[src/index.ts:22](https://github.com/saqqdy/node-wxcrypto/blob/c12bf27/src/index.ts#L22)

---

### WeixinVerifyMessageXMLData

Ƭ **WeixinVerifyMessageXMLData**: [`withXMLProp`](interfaces/withXMLProp.md)<[`WeixinMessageData`](interfaces/WeixinMessageData.md) & { `ComponentVerifyTicket?`: `string` ; `InfoType`: `"component_verify_ticket"` }\>

#### Defined in

[src/index.ts:37](https://github.com/saqqdy/node-wxcrypto/blob/c12bf27/src/index.ts#L37)

## Functions

### aes256Decrypt

▸ **aes256Decrypt**(`algorithm`, `key`, `iv`, `inputEncoding?`, `outputEncoding?`, `options?`): `Buffer`

aes256 decrypt function

**`Params`**

algorithm - algorithm data

**`Params`**

encodingAESKey - encodingAESKey

**`Params`**

inputEncoding - The encoding of the data.

**`Params`**

outputEncoding - The encoding of the return value.

**`Params`**

options - stream.transform options

#### Parameters

| Name             | Type                      | Default value |
| :--------------- | :------------------------ | :------------ |
| `algorithm`      | `string`                  | `undefined`   |
| `key`            | `Buffer`                  | `undefined`   |
| `iv`             | `Buffer`                  | `undefined`   |
| `inputEncoding`  | `Encoding`                | `'base64'`    |
| `outputEncoding` | `undefined` \| `Encoding` | `undefined`   |
| `options?`       | `CipherCCMOptions`        | `undefined`   |

#### Returns

`Buffer`

str - return Buffer

#### Defined in

[src/aes256.ts:52](https://github.com/saqqdy/node-wxcrypto/blob/c12bf27/src/aes256.ts#L52)

---

### aes256Encrypt

▸ **aes256Encrypt**(`algorithm`, `key`, `iv`, `inputEncoding?`, `outputEncoding?`, `options?`): `Buffer`

aes256 encrypt function

**`Params`**

algorithm - algorithm buffer data

**`Params`**

key - AESKey

**`Params`**

iv - iv

**`Params`**

inputEncoding - always undefined

**`Params`**

outputEncoding - The encoding of the return value.

**`Params`**

options - stream.transform options

#### Parameters

| Name             | Type                      | Default value |
| :--------------- | :------------------------ | :------------ |
| `algorithm`      | `Buffer`[]                | `undefined`   |
| `key`            | `Buffer`                  | `undefined`   |
| `iv`             | `Buffer`                  | `undefined`   |
| `inputEncoding`  | `undefined` \| `Encoding` | `undefined`   |
| `outputEncoding` | `undefined` \| `Encoding` | `undefined`   |
| `options?`       | `CipherGCMOptions`        | `undefined`   |

#### Returns

`Buffer`

str - return string

#### Defined in

[src/aes256.ts:23](https://github.com/saqqdy/node-wxcrypto/blob/c12bf27/src/aes256.ts#L23)

---

### buildXML

▸ **buildXML**(`data`, `options?`): `Promise`<`string`\>

build xml

#### Parameters

| Name       | Type                                               | Description         |
| :--------- | :------------------------------------------------- | :------------------ |
| `data`     | `Record`<`string`, `unknown`\>                     | xml object          |
| `options?` | [`BuildXMLOptions`](interfaces/BuildXMLOptions.md) | xml Builder options |

#### Returns

`Promise`<`string`\>

result - xmlString

#### Defined in

[src/xml.ts:60](https://github.com/saqqdy/node-wxcrypto/blob/c12bf27/src/xml.ts#L60)

---

### parseXML

▸ **parseXML**(`data`, `options?`): `Promise`<`any`\>

parse xml promise

#### Parameters

| Name      | Type                  | Description   |
| :-------- | :-------------------- | :------------ |
| `data`    | `convertableToString` | xmlString     |
| `options` | `ParserOptions`       | ParserOptions |

#### Returns

`Promise`<`any`\>

result - xml object

#### Defined in

[src/xml.ts:25](https://github.com/saqqdy/node-wxcrypto/blob/c12bf27/src/xml.ts#L25)

---

### sha1

▸ **sha1**(`...args`): `string`

sha1 摘要算法

#### Parameters

| Name      | Type       | Description |
| :-------- | :--------- | :---------- |
| `...args` | `string`[] | 参数        |

#### Returns

`string`

str - 返回加密后的字符串

#### Defined in

[src/sha1.ts:11](https://github.com/saqqdy/node-wxcrypto/blob/c12bf27/src/sha1.ts#L11)
