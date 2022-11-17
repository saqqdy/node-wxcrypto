import fse from 'fs-extra'
import { DIST_PATH, ESM_PATH, LIB_PATH, SRC_PATH } from '../utils/paths'

const { remove, copy, readdir, existsSync } = fse

const copySourceCode = () =>
    Promise.all([copy(SRC_PATH, ESM_PATH), copy(SRC_PATH, LIB_PATH)])

export { copySourceCode, copySourceCode as default }
