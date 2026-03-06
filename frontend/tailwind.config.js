/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-primary': 'rgb(var(--color-bg-primary) / <alpha-value>)',
                'bg-secondary': 'rgb(var(--color-bg-secondary) / <alpha-value>)',
                'bg-card': 'rgb(var(--color-bg-card) / <alpha-value>)',
                'primary': 'rgb(var(--color-primary) / <alpha-value>)',
                'primary-dark': 'rgb(var(--color-primary-dark) / <alpha-value>)',
                'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
                'accent-blue': 'rgb(var(--color-accent-blue) / <alpha-value>)',
                'accent-light': 'rgb(var(--color-accent-light) / <alpha-value>)',
                'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
                'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
                'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
                'border-custom': 'rgb(var(--color-border) / <alpha-value>)',
            },
            boxShadow: {
                'indicator-glow': '0 0 8px rgba(188, 125, 255, 0.4)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            backgroundImage: {
                'gradient-hero': 'var(--gradient-hero)',
            },
        },
    },
    plugins: [],
}
