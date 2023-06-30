# 更新日志

## 2023.06.30 v3.1.0

1. 支持tree-shaking
2. 升级依赖包

## 2023.06.26 v3.0.0

1. 全新构建输出，支持自动摇树优化
2. 导出 `PKCS7Decode` `PKCS7Encode` 方法
3. 移除不需要的包
4. 升级依赖包

## 2023.03.11 v2.0.1

1. 修复 options 不生效的问题
2. 完善类型导出

## 2023.03.11 v2.0.0

1. 增加传入 options: `normalizeTags`, `buildXmlOptions`, `xmlOptions`。`normalizeTags` 支持将 xml 属性由驼峰转下划线分隔的小写形式；`buildXmlOptions` 透传用于生成 xml 字符串的配置；`xmlOptions` 透传用于解析 xml 字符串的配置。注意：`normalizeTags` 会全量覆盖 `xmlOptions` 里面的 `tagNameProcessors` 方法，如果想要自定义 `tagNameProcessors`，请不要传入 `normalizeTags`
2. 更改 Buffer 分割方法：`slice => subarray`
3. ramrif 替换为 [rm-all](https://github.com/saqqdy/rm-all)
4. 修复 package 的类型导出
5. 升级依赖包

## 2023.02.08 v1.2.1

1. 更改加密安全：`AES-256-GCM => AES-256-CBC`
2. 升级依赖包

## 2023.01.22 v1.1.1

1. 开始使用 `reinstaller` 管理安装包：[reinstaller](https://github.com/saqqdy/reinstaller)
2. 升级安装包

## 2023.01.17 v1.1.0

1. 提升加密安全：`AES-256-CBC => AES-256-GCM`

## 2023.01.16 v1.0.1

1. 完善文档

## 2023.01.15 v1.0.0

1. 发布 1.0 版本，使用方式详见：[说明文档](./README.md)
