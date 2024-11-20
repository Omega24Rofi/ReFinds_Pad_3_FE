/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
     "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightbg:"#EBF6F6",
        mainblue:"#0D96C4",
        lightbluemain:"#AFDAEB",
        blue_btn:"#0D96C4",
        blue_btn_hover: "#0C6886",
        blue_sl : "#DEF1F8",
        blue_sec :"#AEDCEC"

      }
    },
  },
  plugins: [],
    plugins: [
        require('flowbite/plugin')
    ]

};
