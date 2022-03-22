const { guessProductionMode } = require("@ngneat/tailwind");
console.error(guessProductionMode())
process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";


module.exports = {
    prefix: "",
    mode: "jit",
    purge: {
        content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
    },
    darkMode: "class",
    theme: {
        screens: {
            'tablet': { 'min': '350px', 'max': '767px' },
            // => @media (min-width: 350px) { ... }

            'laptop': '1024px',
            // => @media (min-width: 1024px) { ... }

            'desktop': '1280px',
            // => @media (min-width: 1280px) { ... }
        },
        colors: {
            white: "#FFFAFC",
            success: "#23CC7B",
            error: "#EA0C47",
            background: "#121212",
            bg_outline: "rgb(247, 247, 247)",
            red: "#E44A4A",
            active: "rgb(255, 46, 46)",
            edit: "rgb(0, 36, 134)",
            delete: "rgb(134, 0, 0)",
            borderBottomColor: "rgba(0, 0, 0, 0.13)",

        },

        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

// Transaction #6340E5
// Financial #6873E5
// Corporate #E5BE77

// Holiday #32E5B3