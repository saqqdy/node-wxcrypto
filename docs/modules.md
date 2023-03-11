[index.md - v2.0.1](README.md) / Exports

# index.md - v2.0.1

## Table of contents

### References

- [default](modules.md#default)

### Classes

- [WxCrypto](classes/WxCrypto.md)

### Interfaces

- [BuildXMLOptions](interfaces/BuildXMLOptions.md)
- [Options](interfaces/Options.md)
- [withXMLProp](interfaces/withXMLProp.md)

### Type Aliases

- [ParserXMLOptions](modules.md#parserxmloptions)

### Functions

- [aes256Decrypt](modules.md#aes256decrypt)
- [aes256Encrypt](modules.md#aes256encrypt)
- [buildXML](modules.md#buildxml)
- [buildXMLSync](modules.md#buildxmlsync)
- [parseXML](modules.md#parsexml)
- [parseXMLSync](modules.md#parsexmlsync)
- [sha1](modules.md#sha1)

## References

### default

Renames and re-exports [WxCrypto](classes/WxCrypto.md)

## Type Aliases

### ParserXMLOptions

Ƭ **ParserXMLOptions**: `ParserOptions`

#### Defined in

[src/xml.ts:18](https://github.com/saqqdy/node-wxcrypto/blob/912b90f/src/xml.ts#L18)

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

| Name | Type | Default value |
| :------ | :------ | :------ |
| `algorithm` | `string` | `undefined` |
| `key` | `Buffer` | `undefined` |
| `iv` | `Buffer` | `undefined` |
| `inputEncoding` | `Encoding` | `'base64'` |
| `outputEncoding` | `undefined` \| `Encoding` | `undefined` |
| `options?` | `CipherCCMOptions` | `undefined` |

#### Returns

`Buffer`

str - return Buffer

#### Defined in

[src/aes256.ts:52](https://github.com/saqqdy/node-wxcrypto/blob/912b90f/src/aes256.ts#L52)

___

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

| Name | Type | Default value |
| :------ | :------ | :------ |
| `algorithm` | `Buffer`[] | `undefined` |
| `key` | `Buffer` | `undefined` |
| `iv` | `Buffer` | `undefined` |
| `inputEncoding` | `undefined` \| `Encoding` | `undefined` |
| `outputEncoding` | `undefined` \| `Encoding` | `undefined` |
| `options?` | `CipherGCMOptions` | `undefined` |

#### Returns

`Buffer`

str - return string

#### Defined in

[src/aes256.ts:23](https://github.com/saqqdy/node-wxcrypto/blob/912b90f/src/aes256.ts#L23)

___

### buildXML

▸ **buildXML**(`data`, `options?`): `Promise`<`string`\>

build xml

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Record`<`string`, `unknown`\> | xml object |
| `options?` | [`BuildXMLOptions`](interfaces/BuildXMLOptions.md) | xml Builder options |

#### Returns

`Promise`<`string`\>

result - xmlString

#### Defined in

[src/xml.ts:62](https://github.com/saqqdy/node-wxcrypto/blob/912b90f/src/xml.ts#L62)

___

### buildXMLSync

▸ **buildXMLSync**(`data`, `options?`, `callback?`): `string`

build xml sync

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Record`<`string`, `unknown`\> | xml object |
| `options?` | `Function` \| [`BuildXMLOptions`](interfaces/BuildXMLOptions.md) | callback function or xml Builder options |
| `callback?` | `Function` | exec function on build successful |

#### Returns

`string`

result - xmlString

#### Defined in

[src/xml.ts:85](https://github.com/saqqdy/node-wxcrypto/blob/912b90f/src/xml.ts#L85)

___

### parseXML

▸ **parseXML**(`data`, `options?`): `Promise`<`any`\>

parse xml promise

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `convertableToString` | xmlString |
| `options` | `ParserOptions` | ParserXMLOptions |

#### Returns

`Promise`<`any`\>

result - xml object

#### Defined in

[src/xml.ts:27](https://github.com/saqqdy/node-wxcrypto/blob/912b90f/src/xml.ts#L27)

___

### parseXMLSync

▸ **parseXMLSync**(`data`, `options?`, `callback`): `void`

build xml sync

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `convertableToString` | xmlString |
| `options` | `ParserOptions` | callback function or ParserXMLOptions |
| `callback` | `Function` | exec function on build successful |

#### Returns

`void`

result - xml object

#### Defined in

[src/xml.ts:42](https://github.com/saqqdy/node-wxcrypto/blob/912b90f/src/xml.ts#L42)

___

### sha1

▸ **sha1**(`...args`): `string`

sha1摘要算法

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `string`[] | 参数 |

#### Returns

`string`

str - 返回加密后的字符串

#### Defined in

[src/sha1.ts:11](https://github.com/saqqdy/node-wxcrypto/blob/912b90f/src/sha1.ts#L11)
