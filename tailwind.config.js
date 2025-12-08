/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1a1a1a',
                background: '#F8F4E8',
            },
            fontFamily: {
                sans: ['Commit Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}
