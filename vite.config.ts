import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  // @Aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      "@App": path.resolve(__dirname, './src/Components/App'),
      "@Store": path.resolve(__dirname, './src/Store'),
      "@Layouts": path.resolve(__dirname, './src/Layouts'),
      "@Components": path.resolve(__dirname, './src/Components'),
      "@Assets": path.resolve(__dirname, './src/assets'),
      "@Styles": path.resolve(__dirname, 'src/App/Styles'),
      "@Pages": path.resolve(__dirname, './src/Pages'),
      "@Utils": path.resolve(__dirname, './src/Utils'),
      "@Services": path.resolve(__dirname, './src/Services'),
      "@Hooks": path.resolve(__dirname, './src/Utils/Hooks'),
      "@Img": path.resolve(__dirname, './src/assets/img'),
      "@Icons": path.resolve(__dirname, './src/assets/icons'),
    },
  },
  // @Build advanced settings
  base: './',
  server: {
    proxy: {
      '/api': {
           target: 'http://127.0.0.1:4000',
           changeOrigin: true,
           secure: false,
           ws: true,
       }
  },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/_mantine.scss";`,
      },
    },
  },
  // @Plugins
  plugins: [react()],
})