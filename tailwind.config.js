/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    950: '#ffffff',
                    900: '#faf7f5',
                    800: '#f5f0ee',
                    700: '#ede8e5',
                    600: '#e0d8d4',
                    500: '#c8bbb5',
                    400: '#a89890',
                },
                maroon: {
                    50:  '#fdf2f4',
                    100: '#fde6ea',
                    200: '#f9c2cb',
                    300: '#f28fa0',
                    400: '#e85a74',
                    500: '#c0392b',
                    600: '#921c1c',
                    700: '#7a1515',
                    800: '#660f0f',
                    900: '#4a0a0a',
                    950: '#2d0505',
                },
                brown: {
                    50:  '#fdf8f3',
                    100: '#f7ede1',
                    200: '#edd9be',
                    300: '#dfc19a',
                    400: '#c8a070',
                    500: '#a0522d',
                    600: '#7d3e1f',
                    700: '#6b3318',
                    800: '#572914',
                    900: '#3d1c0d',
                    950: '#260f07',
                },
                accent: {
                    cyan: '#06b6d4',
                    violet: '#8b5cf6',
                    fuchsia: '#d946ef',
                    emerald: '#10b981',
                    amber: '#f59e0b',
                    rose: '#f43f5e',
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'slide-in-left': 'slideInLeft 0.3s ease-out',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.2), 0 0 20px rgba(6, 182, 212, 0.1)' },
                    '100%': { boxShadow: '0 0 10px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.15)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
