/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",'./src/**/*.{js,jsx}',],
  theme: {
    extend: {},
  },
  daisyui:{
    // themes: [{
    //   emerald : {
    //     ...require("daisyui/src/theming/themes")["fantasy"]
    //   }
    // }]
    themes: ["fantasy"]
  },
  plugins: [require('daisyui'),],
}

