import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'

export default defineConfig({
    plugins: [
        createVuePlugin(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Alias for @ -> <project>/src
        },
    },
    build: {
        lib: {
            // Your library's entry file
            entry: path.resolve(__dirname, 'src/index.ts'),
            // The global name for UMD/IIFE builds
            name: 'TextFitSpino',
            // File naming convention
            fileName: (format) => `textfit-spino.${format}.js`,
        },
        rollupOptions: {
            // Exclude dependencies you don't want to bundle
            external: ['vue', 'jquery', 'textfit'],
            output: {
                // Global variable names for UMD builds
                globals: {
                    vue: 'Vue',
                    jquery: 'jQuery',
                    textfit: 'textFit',
                },
            },
        },
    },
})
