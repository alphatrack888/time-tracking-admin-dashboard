import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 9501,
    allowedHosts: true,
  },
  preview: {
    allowedHosts: ["admin.alphatrack.app"], // 👈 add your host here
  },
  define: {
    __API_BASE_URL__: JSON.stringify("https://admin.alphatrack.app"),
  },
});
