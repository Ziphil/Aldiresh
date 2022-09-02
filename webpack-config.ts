//

import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";


const config = {
  entry: ["./source/index.ts"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "./bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "/source": path.resolve(__dirname, "source"),
      "node_modules": path.resolve(__dirname, "node_modules")
    },
  },
  devServer: {
    port: 3030,
    static: {
      directory: path.join(__dirname, "dist")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./source/asset/html/index.html",
      title: "Aldiresh"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: "source/asset", to: "asset"}
      ]
    })
  ]
};

export default config;