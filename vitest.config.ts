import stripJsonComments from "strip-json-comments";
import { defineConfig, type ViteUserConfig } from "vitest/config";

const vitestConfig: ViteUserConfig = defineConfig({
  plugins: [
    {
      name: "jsonc-plugin",
      enforce: "pre",
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
  ],
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts", "src/interfaces.ts"],
      reporter: ["text", "html"],
    },
  },
});

export default vitestConfig;
