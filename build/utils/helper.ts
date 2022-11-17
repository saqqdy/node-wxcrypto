import fse from 'fs-extra'

const { lstatSync, existsSync, readdirSync, readFileSync, outputFileSync } = fse

export const EXT_REGEXP = /\.\w+$/
export const SFC_REGEXP = /\.(vue)$/
export const DEMO_REGEXP = new RegExp('\\' + sep + 'demo$')
export const TEST_REGEXP = new RegExp('\\' + sep + 'test$')
export const ASSET_REGEXP = /\.(png|jpe?g|gif|webp|ico|jfif|svg|woff2?|ttf)$/i
export const STYLE_REGEXP = /\.(css|less|scss)$/
export const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/
export const JSX_REGEXP = /\.(j|t)sx$/
export const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue']

export const isDir = (dir: string) => lstatSync(dir).isDirectory()
export const isDemoDir = (dir: string) => DEMO_REGEXP.test(dir)
export const isTestDir = (dir: string) => TEST_REGEXP.test(dir)
export const isAsset = (path: string) => ASSET_REGEXP.test(path)
export const isSfc = (path: string) => SFC_REGEXP.test(path)
export const isStyle = (path: string) => STYLE_REGEXP.test(path)
export const isScript = (path: string) => SCRIPT_REGEXP.test(path)
export const isJsx = (path: string) => JSX_REGEXP.test(path)
