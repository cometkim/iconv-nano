import { describe, it, expect } from "vitest";

import * as utf_16 from "./utf-16.js";

const isLittleEndianPlatform = () => {
  const buf = new Uint16Array([1]);
  const isLittleEndian =
    new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength)[0] === 1;

  return isLittleEndian;
};

describe("UTF-16", () => {
  describe("encode", () => {
    describe("byte order mark", () => {
      it("encodes byte order mark", () => {
        expect(
          utf_16.encode("", {
            addBOM: true,
            endianness: "little-endian",
          }),
        ).toEqual(new Uint8Array([0xff, 0xfe]));
        expect(
          utf_16.encode("", {
            addBOM: true,
            endianness: "big-endian",
          }),
        ).toEqual(new Uint8Array([0xfe, 0xff]));
      });
      it("does not encode byte order mark", () => {
        expect(
          utf_16.encode("", {
            addBOM: false,
            endianness: "little-endian",
          }),
        ).toEqual(new Uint8Array());
        expect(
          utf_16.encode("", {
            addBOM: false,
            endianness: "big-endian",
          }),
        ).toEqual(new Uint8Array());
      });
    });

    it("encodes input with system endianness correctly", () => {
      const input = "Hello world!😀🚀🧑‍🧑‍🧒‍🧒";
      expect(
        utf_16.encode(input, {
          addBOM: false,
          endianness: isLittleEndianPlatform() ? "little-endian" : "big-endian",
        }),
      ).toEqual(
        new Uint8Array(
          new Uint16Array(
            Array.from({ length: input.length }, (_, i) => input.charCodeAt(i)),
          ).buffer,
        ),
      );
    });
  });

  describe("decode", () => {
    describe("byte order mark", () => {
      it("strips byte order mark", () => {
        expect(
          utf_16.decode(new Uint8Array([0xff, 0xfe]), {
            stripBOM: true,
            endianness: "little-endian",
          }),
        ).toEqual("");
        expect(
          utf_16.decode(new Uint8Array([0xfe, 0xff]), {
            stripBOM: true,
            endianness: "big-endian",
          }),
        ).toEqual("");
      });
      it("does not strip byte order mark", () => {
        expect(
          utf_16.decode(new Uint8Array([0xff, 0xfe]), {
            stripBOM: false,
            endianness: "little-endian",
          }),
        ).toEqual("\ufeff");
        expect(
          utf_16.decode(new Uint8Array([0xfe, 0xff]), {
            stripBOM: false,
            endianness: "big-endian",
          }),
        ).toEqual("\ufeff");
      });
    });
  });
});
