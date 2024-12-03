import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import alias from '@rollup/plugin-alias';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rootDir = path.resolve(__dirname)

console.log(__dirname, rootDir)


export default [
  {
    input: './src/core/index.ts',
    output: [
      {
        format: 'cjs',
        dir: 'dist',
        entryFileNames: '[name].cjs.js',
        sourcemap: false,
        plugins: [
          terser()
        ]
      },
      {
        format: 'esm',
        dir: 'dist',
        entryFileNames: '[name].esm.js',
        sourcemap: false,
        // plugins: [
        //   terser()
        // ]
      },
      {
        format: 'umd',
        dir: 'dist',
        entryFileNames: '[name].umd.js',
        sourcemap: false,
        name: 'BoomTool', // umd模块名称，相当于一个命名空间，会自动挂载到window下面
        // plugins: [
        //   terser() // 压缩代码
        // ]
      }
    ],
    plugins: [
      alias({
        entries: [
          {
            find: '@', replacement: path.resolve(rootDir, 'src')
          }
        ]
      }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          incremental: false
        }
      })
    ]
  }
]
