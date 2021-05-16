const path = require("path");

const webpack = require("webpack");

module.exports = {
  entry: "./frontend/src/index.js",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,

        exclude: /node_modules/,

        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  resolve: {
    extensions: ["*", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "./frontend/static/frontend"),
    filename: "main.js",
  },
};
/*module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};*/
