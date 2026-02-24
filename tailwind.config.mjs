/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                code: ['Fira Code', 'monospace'],
                display: ['VT323', 'monospace'],
            },
        },
    },
    plugins: [],
}
