module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {}
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    neutral: '#d5d5d5'
                }
            }
        ]
    },
    plugins: [require('daisyui')]
};
