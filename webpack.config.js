const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = (env, argv) => {
  const mode = argv.mode || "development";

  // Load correct env file
  const envFile = `.env.${mode}`;
  const envConfig = dotenv.config({ path: envFile }).parsed || {};

  // Convert env vars for DefinePlugin
  const envKeys = Object.keys(envConfig).reduce((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(envConfig[key]);
    return acc;
  }, {});

  return {
    mode,

    entry: "./src/index.js",

    resolve: {
      extensions: [".js", ".jsx"]
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name][hash][ext]",
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name][hash][ext]",
          },
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin(envKeys), // 👈 inject env vars
    ],

    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      port: 3000,
      open: true,
      hot: true,
    },
  };
};
