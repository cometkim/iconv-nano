import { describe, expect, it } from "vitest";

import * as x_user_defined from "./x-user-defined.js";

describe("x-user-defined", () => {
  describe("encode", () => {
    it("encodes unknown characters as ?", () => {
      const input = "👤";
      const encodedInput = x_user_defined.encode(input);
      expect(encodedInput).toEqual(x_user_defined.encode("?"));
      expect(x_user_defined.decode(encodedInput)).toBe("?");
    });
  });

  describe("survives roundtrip conversion", () => {
    it.for(
      Object.entries({
        ASCII: Array.from({ length: 0x7f }, (_, i) =>
          String.fromCharCode(i),
        ).join(""),
        "Unicode Private Use Area (PUA)": Array.from(
          { length: 0xf7ff - 0xf780 },
          (_, i) => String.fromCharCode(i + 0xf780),
        ).join(""),
      }),
    )("%s", ([, input]) => {
      const encodedInput = x_user_defined.encode(input);

      expect(x_user_defined.decode(encodedInput)).toBe(input);
    });
  });
});
