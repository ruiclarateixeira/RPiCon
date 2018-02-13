var path = require("path");

module.exports = {
  entry: "./app/view/index.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  target: "electron",
  module: {
    loaders: [
      {
        test: /\.jsx|\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          plugins: [
            "transform-decorators-legacy",
            "transform-class-properties"
          ],
          presets: ["env"]
        }
      }
    ]
  },
  resolve: {
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat"
    }
  }
};
