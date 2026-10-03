import { defineConfig, type ViteUserConfig } from "vitest/config";

const vitestConfig: ViteUserConfig = defineConfig({
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
