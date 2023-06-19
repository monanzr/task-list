/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#1c4f4a",
        secondaryColor: "#fc6719",
        lightColor: "#f5f3ef",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
