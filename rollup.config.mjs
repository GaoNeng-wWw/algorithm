import common from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
	input: 'packages/index.ts',
    output:[
        {
            file: 'dist/bundle.js',
            format: 'esm'
        },
        {
            file: 'dist/bundle.cjs',
            format: 'cjs'
        },
        {
            file: 'dist/bundle.iife.js',
            format: 'iife'
        }
    ],
    plugins: [
        ts(),
        resolve({
            extensions: ['.js', '.ts']
        }),
        common(),
    ],
    external: [],
};
export default config;