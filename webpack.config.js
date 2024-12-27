const path = require("path");

module.exports = {
  mode: "production", // Use 'production' mode to optimize output
  entry: "./src/content.js",
  output: {
    filename: "content.bundle.js", // Bundled output
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match JavaScript and JSX files
        exclude: /node_modules/, // Exclude dependencies
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // Transpile React and modern JavaScript
          },
        },
      },
    ],
  },
  devtool: "source-map", // Ensure source maps for easier debugging
  resolve: {
    extensions: [".js", ".jsx"], // Resolve these extensions
  },
};
