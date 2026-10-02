import { defineConfig, type UserConfig } from "tsdown";

const tsdownConfig: UserConfig = defineConfig({
  entry: "src/index.ts",
  platform: "neutral",
  target: "esnext",
  treeshake: true,
  unbundle: true,
  publint: true,
  attw: {
    profile: "esm-only",
    ignoreRules: ["no-resolution"],
  },
  // Does not support "types" package.json export condition
  // https://github.com/rolldown/tsdown/issues/875
  exports: false,
});

export default tsdownConfig;
