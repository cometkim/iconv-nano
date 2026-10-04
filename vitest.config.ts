import { playwright } from "@vitest/browser-playwright";
import { defineConfig, type ViteUserConfig } from "vitest/config";

const vitestConfig: ViteUserConfig = defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts", "src/interfaces.ts"],
      reporter: ["text"],
    },
    browser: {
      provider: playwright(),
      enabled: true,
      instances: [{ browser: "chromium" }],
      headless: true,
      ui: false,
    },
  },
});

export default vitestConfig;
