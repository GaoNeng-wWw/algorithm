const ts = require('rollup-plugin-typescript2');
const resolve = require('@rollup/plugin-node-resolve');
const pkg = require('./package.json');

/** @type {import('rollup').RollupOptions} */
const config = {
    output: [
        {
            dir: './dist/lib',
            name: pkg.name,
            format: 'cjs'
        },
        {
            dir: './dist',
            name: pkg.name,
            format: 'umd'
        },
        {
            dir: './dist/es',
            name: pkg.name,
            format: 'esm',
        },
        {
            dir: './dist/iife',
            name: pkg.name,
            format: 'iife'
        }
    ],
    input: './src/index.ts',
    plugins: [ts(), resolve()],
}
module.exports = config;