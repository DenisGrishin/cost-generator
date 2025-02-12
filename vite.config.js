import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [],
  build: {
    cssCodeSplit: false,
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        clientPage: resolve(__dirname, "pages/client-page.html"),
        clients: resolve(__dirname, "pages/clients.html"),
        createSmeta: resolve(__dirname, "pages/create-smeta.html"),
        createTemplate: resolve(__dirname, "pages/create-template.html"),
        fileStorage: resolve(__dirname, "pages/file-storage.html"),
        priceList: resolve(__dirname, "pages/price-list.html"),
        templatePage: resolve(__dirname, "pages/template-page.html"),
        templates: resolve(__dirname, "pages/templates.html"),
        usersPage: resolve(__dirname, "pages/users-page.html"),
      },
    },
  },
  terserOptions: {
    format: {
      comments: "some",
    },
  },
});
