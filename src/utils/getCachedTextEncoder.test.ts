import { describe, expect, it } from "vitest";

import { getCachedTextEncoder } from "./getCachedTextEncoder.js";

describe("getCachedTextEncoder", () => {
  it("returns a TextEncoder", () => {
    expect(getCachedTextEncoder()).toBeInstanceOf(TextEncoder);
  });

  it("always has encoding UTF-8", () => {
    expect(getCachedTextEncoder()).toHaveProperty("encoding", "utf-8");
  });

  it("returns the same instance on every call", () => {
    expect(getCachedTextEncoder()).toBe(getCachedTextEncoder());
  });

  it("encodes strings to UTF-8 bytes", () => {
    expect(getCachedTextEncoder().encode("é")).toEqual(
      Uint8Array.of(0xc3, 0xa9),
    );
  });
});
