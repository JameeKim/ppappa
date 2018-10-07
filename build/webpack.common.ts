import { normalize, resolve } from "path";
import { Configuration } from "webpack";

export const path = (...args: string[]): string => normalize(resolve(...args));

export const isProd: boolean = process.env.NODE_ENV === "production";

const config: Configuration = {
  mode: isProd ? "production" : "development",
  target: "web",
  context: path(__dirname, "..", "src"),
  entry: "./index.ts",
  module: {
    rules: [{
      test: /\.ts$/,
      loader: "ts-loader",
    }],
  },
};

export default config;
