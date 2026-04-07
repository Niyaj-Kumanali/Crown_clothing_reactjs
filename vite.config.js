import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'named',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
  server: {
    port: 3000, // Matching your preferred port
    open: true, // Opens browser automatically
  },
  build: {
    outDir: 'build', // Matching CRA's build output directory name
  },
  define: {
    // Ensuring process.env.NODE_ENV works (though import.meta.env is preferred in Vite)
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.PUBLIC_URL': JSON.stringify(''), // We use root base "/" now as requested
  },
});
