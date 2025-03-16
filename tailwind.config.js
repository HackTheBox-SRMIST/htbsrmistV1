const { url } = require("inspector");

// tailwind.config.js
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./utils/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                "htb-green": "#9FEF00",
                "hacker-grey": "#A4B1CD",
                "node-black": "#141D2B",
                "htb-navy": "#0B121F"
            },
            fontFamily: {
                "sans-serif": ["Montserrat", "sans-serif"],
                "share-tech": ["Share Tech", "sans - serif"],
                poppins: ["Poppins", "sans-serif"]
            },
            backgroundImage: {
                hackerfooter: "url('/bg.png')"
            }
        }
    },
    plugins: []
};
