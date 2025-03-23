import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "src", // tetap pakai src sebagai root
  base: './', // 🚩 ini yang wajib untuk Electron production!
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../dist", // output tetap dist/
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
