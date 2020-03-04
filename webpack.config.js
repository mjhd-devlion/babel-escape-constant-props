const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const outputPath = path.resolve(__dirname, "dist");

module.exports = {
  mode: "development",

  output: {
    filename: "main.js",
    path: outputPath
  },
  devServer: {
    contentBase: outputPath
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ],

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        loader: "babel-loader"
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  optimization: {}
};
