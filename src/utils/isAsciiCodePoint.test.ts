import { describe, expect, it } from "vitest";

import { isAsciiCodePoint } from "./isAsciiCodePoint.js";

describe("isAsciiCodePoint", () => {
  it("returns true for ASCII codepoints", () => {
    expect(
      Array.from({ length: 128 }, (_, i) => isAsciiCodePoint(i)),
    ).not.toContain(false);
  });
  it("returns false for non-ASCII codepoints", () => {
    expect(
      Array.from({ length: 128 }, (_, i) => isAsciiCodePoint(i + 128)),
    ).not.toContain(true);
    expect(
      Array.from("Ⓜ️", (char) => char.codePointAt(0)).map((codePoint) =>
        codePoint !== undefined ? isAsciiCodePoint(codePoint) : false,
      ),
    ).not.toContain(true);
  });
});
