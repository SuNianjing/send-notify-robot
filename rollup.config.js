import { defineConfig } from "rollup"
import del from "rollup-plugin-delete"
import json from "@rollup/plugin-json"
import typescript from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import polyfillNode from "rollup-plugin-polyfill-node";
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

export default defineConfig({
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: false,
            globals: {
                axios: "axios",
                tslib: "tslib",
                util: "require$$1",
                stream: "stream",
                path: "require$$1$1",
                http: "require$$3",
                https: "require$$4",
                url: "require$$0$1",
                fs: "require$$6",
                assert: "require$$4$1",
                zlib: "zlib",
                events: "events$1"
            }
        },
        { file: pkg.module, format: "es", sourcemap: false },
        {
            file: pkg.browser,
            format: "iife",
            name: "SendRobot",
            exports: "named",
            globals: { axios: "axios", 'crypto-js': "crypto-js", tslib: "tslib" }
        },
    ],
    watch: {
        include: "src/**"
    },
    plugins: [
        del({ targets: ["dist/*"] }),
        json(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: "./tsconfig.json",
            declaration: true,
            declarationDir: null,
        }),
        polyfillNode({
            exclude: ['stream', 'util']
        }),
        terser(),
    ],
    external: ['tslib', 'axios']
})