import { describe, expect, it } from "vitest";

import euc_kr_encoding from "../../encodings/euc-kr.json" with { type: "json" };
import * as euc_kr from "./euc-kr.js";

describe("EUC-KR", () => {
  it("survives roundtrip conversion", () => {
    const input =
      Array.from({ length: 0x7f }, (_, i) => String.fromCharCode(i)).join("") +
      Object.keys(euc_kr_encoding).join("");
    const encodedInput = euc_kr.encode(input);

    expect(euc_kr.decode(encodedInput)).toBe(input);
  });
});
