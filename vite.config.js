/* eslint-disable no-unused-vars */

import { defineConfig } from "vite";
import { createRequire } from "module";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 🔹 Dev server (npm run dev)
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: "all", // ✅ FIXED
    proxy: {
      "/api/v1": {
        target: "https://api.alphatrack.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // 🔹 Preview server (npm run preview / PM2)
  preview: {
    host: "0.0.0.0", // ✅ IMPORTANT
    port: 3000,
    allowedHosts: ["admin.alphatrack.app"], // ✅ FIXED
  },

  // 🔹 Global variables
  define: {
    __API_BASE_URL__: JSON.stringify("https://api.alphatrack.app"), // ⚠️ FIXED (was wrong before)
  },
});



// eslint-disable no-unused-vars
// import { defineConfig } from "vite";
// import { createRequire } from 'module';
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// const require = createRequire(import.meta.url);
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     host: "0.0.0.0",
//     port: 9502,
//     allowedHosts: true,
//     proxy: {
//       "/api/v1": {
//         target: "https://api.alphatrack.app",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
//   preview: {
//     allowedHosts: ["admin.alphatrack.app"], // 👈 add your host here
//   },
//   define: {
//     __API_BASE_URL__: JSON.stringify("https://admin.alphatrack.app"),
//   },
// });