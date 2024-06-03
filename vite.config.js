import { defineConfig } from "vite";

const config = defineConfig({
    build: {
        outDir: "docs"
    },
    base: "/" // Ensure the base is correct for your project
});

export default config;