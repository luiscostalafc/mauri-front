module.exports = {
  presets: ["next/babel","@babel/preset-react", "@babel/preset-env"],
  plugins: [
    ["styled-components", { "ssr": true }],
    "inline-react-svg",
    "emotion"
  ]
}
