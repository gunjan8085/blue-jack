import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import commonjs from "vite-plugin-commonjs";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), commonjs()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@services": path.resolve(__dirname, "src/services"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@styles": path.resolve(__dirname, "src/style"),
      "@contexts": path.resolve(__dirname, "src/context"),
      "@hook": path.resolve(__dirname, "src/hook"),
    },
  },
});
