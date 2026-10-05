import { describe, expect, it } from "vitest";

import * as gb18030 from "./gb18030.js";

describe("gb18030", () => {
  it("correctly encodes sample inputs", () => {
    // python3 -c 'print("食言者当受食岩之罚".encode("gb18030").hex())'
    expect(gb18030.encode("食言者当受食岩之罚")).toEqual(
      Uint8Array.fromHex("cab3d1d4d5dfb5b1cadccab3d1d2d6aeb7a3"),
    );

    // python3 -c 'print("欲买桂花同载酒，终不似，少年游".encode("gb18030").hex())'
    expect(gb18030.encode("欲买桂花同载酒，终不似，少年游")).toEqual(
      Uint8Array.fromHex(
        "d3fbc2f2b9f0bba8cdacd4d8bec6a3acd6d5b2bbcbc6a3acc9d9c4ead3ce",
      ),
    );

    // python3 -c 'print("近前看端详。上写着秦香莲她三十二岁，状告当朝驸马郎。欺君王、瞒皇上，悔婚男儿招东床。".encode("gb18030").hex())'
    expect(
      gb18030.encode(
        "近前看端详。上写着秦香莲她三十二岁，状告当朝驸马郎。欺君王、瞒皇上，悔婚男儿招东床。",
      ),
    ).toEqual(
      Uint8Array.fromHex(
        "bdfcc7b0bfb4b6cbcfeaa1a3c9cfd0b4d7c5c7d8cfe3c1abcbfdc8fdcaaeb6fecbeaa3acd7b4b8e6b5b1b3afe6e2c2edc0c9a1a3c6dbbefdcdf5a1a2c2f7bbcac9cfa3acbbdabbe9c4d0b6f9d5d0b6abb4b2a1a3",
      ),
    );
  });
});
