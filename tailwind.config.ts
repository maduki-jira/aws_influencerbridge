import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#ffc1a2',
                    dark: '#F9b17a',
                },
                text: {
                    light: '#053b47',
                    dark: '#ffffff',
                },
                background: {
                    light: '#faf3ee',
                    dark: '#2d3250',
                },
                highlight: {
                    light: '#ffeae0',
                    dark: '#676f9d',
                },
            },

            fontSize: {
                'header': '2.5rem',
                'subheader': '1.5rem',
                'body': '1rem',
                'subbody': '0.75rem',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
};

export default config;
