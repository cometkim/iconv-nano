import { describe, expect, it } from "vitest";

import jis0208_encoding from "../../encodings/jis0208.json" with { type: "json" };
import * as euc_jp from "./euc-jp.js";

describe("EUC-JP", () => {
  it("encodes ¥ as \\", () => {
    const encodedInput = euc_jp.encode("¥");
    expect(encodedInput).toEqual(new Uint8Array(["\\".charCodeAt(0)]));
    expect(euc_jp.decode(encodedInput)).toBe("\\");
  });

  it("encodes ‾ as ~", () => {
    const encodedInput = euc_jp.encode("‾");
    expect(encodedInput).toEqual(new Uint8Array(["~".charCodeAt(0)]));
    expect(euc_jp.decode(encodedInput)).toBe("~");
  });

  it("encodes − as －", () => {
    const encodedInput = euc_jp.encode("−");
    expect(encodedInput).toEqual(euc_jp.encode("－"));
    expect(euc_jp.decode(encodedInput)).toBe("－");
  });

  it("survives roundtrip conversion", () => {
    const input =
      Array.from({ length: 0x7f }, (_, i) => String.fromCharCode(i)).join("") +
      Array.from({ length: 0xff9f - 0xff61 }, (_, i) =>
        String.fromCharCode(i + 0xff61),
      ).join("") +
      Object.keys(jis0208_encoding).join("");
    const encodedInput = euc_jp.encode(input);

    expect(euc_jp.decode(encodedInput)).toBe(input);
  });

  it("encodes unknown characters as ?", () => {
    const encodedInput = euc_jp.encode("🈁");
    expect(encodedInput).toEqual(euc_jp.encode("?"));
    expect(euc_jp.decode(encodedInput)).toBe("?");
  });
});
