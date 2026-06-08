import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@/registry": path.resolve(__dirname, "./registry"),
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
