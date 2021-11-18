module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js, ts}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          850: "#273345",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
