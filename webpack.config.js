const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = (env, argv) => {
  const mode = argv.mode || "development";

  // Load local env file (if exists)
  const envFile = `.env.${mode}`;
  const localEnv = dotenv.config({ path: envFile }).parsed || {};

  // Merge Netlify env + local env
  const finalEnv = {
    ...process.env,
    ...localEnv,
  };

  return {
    mode,

    entry: "./src/index.js",

    resolve: {
      extensions: [".js", ".jsx"],
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
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),

      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public/_redirects"),
            to: "_redirects",
          },
        ],
      }),

      new webpack.DefinePlugin({
        "process.env": JSON.stringify(finalEnv),
      }),
    ],

    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      port: 3000,
      hot: true,
      open: true,
    },
  };
};
