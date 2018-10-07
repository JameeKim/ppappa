import merge from "webpack-merge";
import config1, { path } from "./webpack.common";

const config = merge(config1, {
  output: {
    path: path(__dirname, "..", "web"),
    filename: "index.js",
  },
});

export default config;
