import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://sk4rz.github.io',
    base: '/',
    integrations: [tailwind()],
    markdown: {
        syntaxHighlight: 'shiki',
        shikiConfig: {
            theme: 'vitesse-dark', // High-quality modern dark theme mimicking gruvbox contrast
        }
    }
});
