import babel from "rollup-plugin-babel";

export default {
  entry: "src/entry.js",
  format: "umd",
  moduleName: "$",
  noConflict: true,
  plugins: [
    babel({
      presets: ["es2015-rollup"]
    })
  ],
};
