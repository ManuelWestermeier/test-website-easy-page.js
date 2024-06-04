import { defineConfig } from "vite";

const config = defineConfig({
    build: {
        outDir: "docs"
    },
    base: /test-website-easy-page.js/
});

export default config;