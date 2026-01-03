const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

// Load .env variables
const env = dotenv.config().parsed;

// Convert env object to DefinePlugin format
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin(envKeys) // 👈 inject env vars
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "public")
    },
    port: 3000,
    open: true,
    hot: true
  }
};
