import { describe, expect, it } from "vitest";

import euc_kr_encoding from "../../encodings/euc-kr.json" with { type: "json" };
import * as euc_kr from "./euc-kr.js";

describe("EUC-KR", () => {
  it("correctly encodes sample inputs", () => {
    // python3 -c 'print("비빔밥".encode("euc-kr").hex())'
    expect(euc_kr.encode("비빔밥")).toEqual(Uint8Array.fromHex("baf1baf6b9e4"));

    // python3 -c 'print("회귀를 계속하다 보면, 언젠가 네놈을 만날 수도 있는 건가?".encode("euc-kr").hex())'
    expect(
      euc_kr.encode("회귀를 계속하다 보면, 언젠가 네놈을 만날 수도 있는 건가?"),
    ).toEqual(
      Uint8Array.fromHex(
        "c8b8b1cdb8a620b0e8bcd3c7cfb4d920bab8b8e92c20bef0c1a8b0a120b3d7b3f0c0bb20b8b8b3af20bcf6b5b520c0d6b4c220b0c7b0a13f",
      ),
    );
  });

  it("survives roundtrip conversion", () => {
    const input =
      Array.from({ length: 0x7f }, (_, i) => String.fromCharCode(i)).join("") +
      Object.keys(euc_kr_encoding).join("");
    const encodedInput = euc_kr.encode(input);

    expect(euc_kr.decode(encodedInput)).toBe(input);
  });

  it("encodes unknown characters as ?", () => {
    const input = "🥘";
    const encodedInput = euc_kr.encode(input);
    expect(encodedInput).toEqual(euc_kr.encode("?"));
    expect(euc_kr.decode(encodedInput)).toBe("?");
  });
});
