import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  resolve: {
    alias: {
      app: "/src/app",
      pages: "/src/pages",
      widgets: "/src/widgets",
      features: "/src/features",
      entities: "/src/entities",
      shared: "/src/shared",
      server: "/server",
    },
  },
});
