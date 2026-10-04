import { describe, expect, it } from "vitest";

import big5_encoding from "../../encodings/big5.json" with { type: "json" };
import * as big5 from "./big5.js";

describe("Big5", () => {
  it("survives roundtrip conversion", () => {
    const input =
      Array.from({ length: 0x7f }, (_, i) => String.fromCharCode(i)).join("") +
      Object.keys(big5_encoding).join("");
    const encodedInput = big5.encode(input);

    expect(big5.decode(encodedInput)).toBe(input);
  });

  it("encodes unknown characters as ?", () => {
    const input = "🧋";
    const encodedInput = big5.encode(input);
    expect(encodedInput).toEqual(big5.encode("?"));
    expect(big5.decode(encodedInput)).toBe("?");
  });
});
