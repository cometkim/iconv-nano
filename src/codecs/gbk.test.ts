import { describe, expect, it } from "vitest";

import gb18030_encoding from "../../encodings/gb18030.json" with { type: "json" };
import * as gbk from "./gbk.js";

describe("gb18030", () => {
  describe("encode", () => {
    it("encodes € as 0x80", () => {
      expect(gbk.encode("€")).toEqual(new Uint8Array([0x80]));
    });

    it("encodes unsupported characters as ?", () => {
      expect(gbk.encode("\u{1f600}")).toEqual(new Uint8Array([0x3f]));
    });

    it("encodes GBK-compatible characters", () => {
      expect(gbk.encode("你好")).toEqual(
        new Uint8Array([0xc4, 0xe3, 0xba, 0xc3]),
      );
    });

    it("encodes U+E5E5 as ?", () => {
      expect(gbk.encode("\uE5E5")).toEqual(new Uint8Array([0x3f]));
    });
  });

  describe("survives roundtrip conversion", () => {
    it.for(
      Object.entries({
        ASCII: Array.from({ length: 0x7f }, (_, i) =>
          String.fromCharCode(i),
        ).join(""),
        "GB 18030": Object.keys(gb18030_encoding).join(""),
      }),
    )("%s", ([, input]) => {
      const encodedInput = gbk.encode(input);

      expect(gbk.decode(encodedInput)).toBe(input);
    });
  });
});
