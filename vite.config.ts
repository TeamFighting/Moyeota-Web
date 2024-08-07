import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            exportAsDefault: true,
            svgrOptions: {
                icon: true,
            },
        }),
    ],
    server: {
        host: 'localhost',
        port: 3000,
        // proxy: {
        //     '/api': {
        //         target: 'https://moyeota.site',
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, ''),
        //         secure: false,
        //         ws: true,
        //     },
        // },
    },
});
