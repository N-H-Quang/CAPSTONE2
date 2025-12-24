import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        define: {
            'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL),
            'process.env.REACT_APP_SECRET_TOKEN': JSON.stringify(env.REACT_APP_SECRET_TOKEN)
        }
    };
});
