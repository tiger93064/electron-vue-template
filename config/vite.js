const Path = require('path');
const vuePlugin = require('@vitejs/plugin-vue')

const { defineConfig } = require('vite');
const vuetify  = require('@vuetify/vite-plugin');


/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
    root: Path.join(__dirname, '..', 'src', 'renderer'),
    publicDir: 'public',
    server: {
        port: 8192,
    },
    open: false,
    build: {
        outDir: Path.join(__dirname, '..', 'build', 'renderer'),
        emptyOutDir: true,
    },
    plugins: [vuePlugin(), vuetify({ autoImport: true })],
    resolve: {
        alias: {
            '@': Path.join(__dirname, '..', 'src', 'renderer')
        }
    }
});

module.exports = config;