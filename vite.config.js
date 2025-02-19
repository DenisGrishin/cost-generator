import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [],
  build: {
    cssCodeSplit: true,
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        clientPage: resolve(__dirname, "client-page.html"),
        clients: resolve(__dirname, "clients.html"),
        createSmeta: resolve(__dirname, "create-smeta.html"),
        createTemplate: resolve(__dirname, "create-template.html"),
        fileStorage: resolve(__dirname, "file-storage.html"),
        priceList: resolve(__dirname, "price-list.html"),
        templatePage: resolve(__dirname, "template-page.html"),
        templates: resolve(__dirname, "templates.html"),
        usersPage: resolve(__dirname, "users-page.html"),
      },
      output: {
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/[name]-[hash].js",
        assetFileNames: "css/[name]-[hash].[ext]",
      },
    },
  },
  terserOptions: {
    format: {
      comments: "some",
    },
  },
});
