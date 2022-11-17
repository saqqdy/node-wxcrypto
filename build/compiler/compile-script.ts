import fse from 'fs-extra';
import babel from '@babel/core';
import esbuild, { type Format } from 'esbuild';
import { sep } from 'path';
import { isJsx, replaceExt, getVantConfig } from '../common/index.js';
import { replaceCSSImportExt } from '../common/css.js';
import { replaceScriptImportExt } from './get-deps.js';