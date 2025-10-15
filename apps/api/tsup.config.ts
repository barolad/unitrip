import { defineConfig } from "tsup";

export default defineConfig({
  dts: true,
  minify: true,
  format: ["cjs", "esm"],
  platform: "node",
  splitting: false,
  sourcemap: false,
  entry: ["src/index.ts", "src/hc.ts"],
});
