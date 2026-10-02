import { minify } from "rolldown/utils";
import stripJsonComments from "strip-json-comments";
import { defineConfig, type UserConfig } from "tsdown";

const tsdownConfig: UserConfig = defineConfig({
  entry: "src/index.ts",
  platform: "neutral",
  target: "esnext",
  treeshake: true,
  plugins: [
    {
      name: "jsonc-plugin",
      load: {
        filter: {
          id: [/.json$/],
        },
        async handler(id) {
          return stripJsonComments(
            await this.fs.readFile(id, { encoding: "utf8" }),
          );
        },
      },
    },
    {
      name: "minify-json-plugin",
      renderChunk: {
        filter: {
          code: [/^\/\/#region encodings\/[^/]+\.json\r?\n/],
        },
        handler(code, chunk) {
          if (chunk.name.endsWith("json")) {
            return minify(chunk.fileName, code);
          }
          return null;
        },
      },
    },
  ],
  // Otherwise, rolldown attempts to format the output, overwriting minify-json-plugin
  minify: false,
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
