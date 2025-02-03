import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
  },
  terserOptions: {
    format: {
      comments: "some",
    },
  },
});
