import merge from "webpack-merge";
import config1, { path } from "./webpack.common";

const config = merge(config1, {
  context: path(__dirname, "..", "src", "compiler"),
  output: {
    path: path(__dirname, "..", "dist"),
    filename: "compiler.bundle.js",
    library: "ppappa",
    libraryTarget: "umd",
  },
});

export default config;
