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
    allowedHosts: ["admin.alphatrack.app", ".alphatrack.app"],
    host: "0.0.0.0",
    port: 9501,
  },
});
