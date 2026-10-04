import { describe, expect, it } from "vitest";

import shift_js_encoding from "../../encodings/shift_jis.json" with { type: "json" };
import * as shift_jis from "./shift_jis.js";

describe("Shift_JIS", () => {
  it("encodes ¥ as \\", () => {
    const encodedInput = shift_jis.encode("¥");
    expect(encodedInput).toEqual(new Uint8Array(["\\".charCodeAt(0)]));
    expect(shift_jis.decode(encodedInput)).toBe("\\");
  });

  it("encodes ‾ as ~", () => {
    const encodedInput = shift_jis.encode("‾");
    expect(encodedInput).toEqual(new Uint8Array(["~".charCodeAt(0)]));
    expect(shift_jis.decode(encodedInput)).toBe("~");
  });

  it("encodes − as －", () => {
    const encodedInput = shift_jis.encode("−");
    expect(encodedInput).toEqual(shift_jis.encode("－"));
    expect(shift_jis.decode(encodedInput)).toBe("－");
  });

  // The codec does not actually survive roundtrip conversion per the spec: "¥"
  // returns "\" and "‾" returns "~" due to ASCII compatibility
  it("survives roundtrip conversion", () => {
    const input =
      Array.from({ length: 0x7f }, (_, i) => String.fromCharCode(i)).join("") +
      String.fromCharCode(0x80) +
      Array.from({ length: 0xff9f - 0xff61 }, (_, i) =>
        String.fromCharCode(i + 0xff61),
      ).join("") +
      Object.keys(shift_js_encoding).join("");
    const encodedInput = shift_jis.encode(input);

    expect(shift_jis.decode(encodedInput)).toBe(input);
  });

  it("encodes unknown characters as ?", () => {
    const encodedInput = shift_jis.encode("🈲");
    expect(encodedInput).toEqual(shift_jis.encode("?"));
    expect(shift_jis.decode(encodedInput)).toBe("?");
  });
});
