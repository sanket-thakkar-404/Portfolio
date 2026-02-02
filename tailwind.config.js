/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}", "./js/**/*.js"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Helvetica', 'Arial', 'sans-serif'],
                serif: ['Times New Roman', 'Times', 'serif'],
            },
            colors: {
                'brand-dark': '#0a0a0a',
                'brand-gray': '#1a1a1a',
                'brand-accent': '#ff4d00', // Orange-ish accent from image
                'brand-text-muted': '#888888'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
                'float': 'float 3s ease-in-out infinite',
            }
        },
    },
    plugins: [],
}
