import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
// import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import { visualizer } from 'rollup-plugin-visualizer'
import pkg from './package.json'

const config = require('./config')
const externals = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
]

// const production = !process.env.ROLLUP_WATCH

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: pkg.main,
                exports: 'auto',
                format: 'cjs',
                banner: config.banner
            },
            {
                file: pkg.module,
                exports: 'auto',
                format: 'es',
                banner: config.banner
            }
        ],
        plugins: [
            resolve({
                // Use the `package.json` "browser" field
                browser: false,
                // Resolve .mjs and .js files
                extensions: ['.mjs', '.js', '.cjs', '.ts', '.mts', '.cts'],
                // Prefer node.js built-ins instead of npm packages
                preferBuiltins: true,
                customResolveOptions: {
                    moduleDirectories: ['node_modules']
                }
            }),
            commonjs({
                sourceMap: false
            }),
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false,
                        target: 'es6'
                    },
                    include: ['src/**/*.ts'],
                    exclude: [
                        'node_modules',
                        '__tests__',
                        'core-js',
                        'js-cool',
                        'axios'
                    ]
                },
                abortOnError: false
            }),
            babel({
                babelHelpers: 'bundled',
                extensions: config.extensions,
                exclude: [/\/core-js\//, 'node_modules/**'],
                sourceMap: true
            }),
            visualizer()
        ],
        external(id) {
            return [
                'core-js',
                'js-cool',
                'regenerator-runtime',
                '@babel/runtime'
            ]
                .concat(externals)
                .some(k => new RegExp('^' + k).test(id))
        }
    }
]
