import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
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

    },  resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
      },
});
