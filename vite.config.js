import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base path so the production build works both at a domain root and
// in a subpath (e.g. GitHub Pages project sites like /byte-coding-pet/).
export default defineConfig({
  base: "./",
  plugins: [react()],
});
