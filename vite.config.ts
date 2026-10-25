import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * Deploy to a sub-path (for example GitHub Pages user site) with:
 *   BASE_PATH=/udaysaireddy18.github.io/ npm run build
 * The default ("/") works for Vercel, Render and Netlify.
 */
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: "es2022",
    cssTarget: "chrome111",
  },
});