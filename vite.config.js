import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        checkout: resolve(__dirname, "checkout.html"),
        clientPortal: resolve(__dirname, "client_portal.html"),
        admin: resolve(__dirname, "admin.html"),
      },
    },
  },
});
