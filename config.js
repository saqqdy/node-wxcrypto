const path = require('path')
const pkg = require('./package.json')
// const nodeExternals = require('webpack-node-externals')
const externals = {}

// externals = [Object.assign({}, externals), nodeExternals() /*, /^core-js\/.+$/, /^js-cool\/.+$/*/]

exports.banner =
    '/*!\n' +
    ' * ' +
    pkg.name +
    ' v' +
    pkg.version +
    '\n' +
    ' * ' +
    pkg.description +
    '\n' +
    ' * (c) 2021-' +
    new Date().getFullYear() +
    ' saqqdy \n' +
    ' * Released under the MIT License.\n' +
    ' */'
exports.bannerText =
    pkg.name +
    ' v' +
    pkg.version +
    '\n' +
    pkg.description +
    '\n' +
    '(c) 2021-' +
    new Date().getFullYear() +
    ' saqqdy \n' +
    'Released under the MIT License.'
exports.externals = externals
exports.version = pkg.version

exports.extensions = [
    '.js',
    '.mjs',
    '.cjs',
    '.jsx',
    '.ts',
    '.mts',
    '.cts',
    '.tsx',
    '.es6',
    '.es',
    '.json'
]

exports.alias = {
    '@': path.resolve(__dirname, '../src'),
    'node-wxcrypto': path.resolve(__dirname, './')
}

exports.jsexclude = /node_modules/
