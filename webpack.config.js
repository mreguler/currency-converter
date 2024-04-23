const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
  entry: {
    main: "./src/main.js",
    popup: "./popup/popup.js"
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "[name]-bundle.js" // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};