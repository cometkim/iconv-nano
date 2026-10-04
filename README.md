# iconv-nano

[github-actions]: https://www.github.com/jeremy-code/iconv-nano/actions/workflows/ci.yml
[github-actions-badge]: https://www.github.com/jeremy-code/iconv-nano/actions/workflows/ci.yml/badge.svg
[license-badge]: https://img.shields.io/github/license/jeremy-code/iconv-nano
[npm-version-badge]: https://img.shields.io/npm/v/iconv-nano
[npm-package]: https://www.npmjs.com/package/iconv-nano

[![GitHub Actions][github-actions-badge]][github-actions] [![License][license-badge]](LICENSE) [![NPM version][npm-version-badge]][npm-package]

You probably shouldn't use this for now.

I'm waiting on ESM [namespace imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#namespace_import) in Rolldown ([rolldown/rolldown#7874](https://github.com/rolldown/rolldown/issues/7874)) to be supported. It looks like it will be coming on Rolldown 1.4. While tree-shaking will still work for encodings, the individual `encode`/`decode` functions cannot be treeshook until this is resolved.

Documentation is avaliable at this URL: https://npmx.dev/package-docs/iconv-nano.

## Usage

```js
import * as iconv from "iconv-nano";

iconv.utf8.encode("😅").toHex(); // "f09f9885"
iconv.utf8.decode(Uint8Array.fromHex("f09f9885")); // "😅"

iconv.ascii.encode("😅").toHex(); // "3f"
iconv.ascii.decode(Uint8Array.fromHex("3f")); // "?"

iconv.utf16.encode("😅", { endianness: "little-endian" }).toHex(); // "3dd805de"
iconv.utf16.decode(Uint8Array.fromHex("3dd805de")); // "😅"

iconv.shift_jis.encode("文字化け"); // "95b68e9a89bb82af"
iconv.shift_jis.decode(Uint8Array.fromHex("95b68e9a89bb82af")); // "文字化け"
```

## Supported encodings

All encodings supported by the [WHATWG Encoding standard](https://encoding.spec.whatwg.org) are supported. Their aliases also have been exported.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Export</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2">
        <a href="https://encoding.spec.whatwg.org/#the-encoding"
          >The Encoding</a
        >
      </td>
    </tr>
    <tr>
      <td><a href="https://en.wikipedia.org/wiki/UTF-8">UTF-8</a></td>
      <td>utf_8</td>
    </tr>
    <tr>
      <td colspan="2">
        <a href="https://encoding.spec.whatwg.org/#legacy-single-byte-encodings"
          >Legacy single-byte encodings</a
        >
      </td>
    </tr>
    <tr>
      <td><a href="https://en.wikipedia.org/wiki/Code_page_866">IBM866</a></td>
      <td>ibm866</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO/IEC_8859-2">ISO-8859-2</a>
      </td>
      <td>iso_8859_2</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO/IEC_8859-3">ISO-8859-3</a>
      </td>
      <td>iso_8859_3</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO/IEC_8859-4">ISO-8859-4</a>
      </td>
      <td>iso_8859_4</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO/IEC_8859-5">ISO-8859-5</a>
      </td>
      <td>iso_8859_5</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO/IEC_8859-6">ISO-8859-6</a>
      </td>
      <td>iso_8859_6</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO/IEC_8859-7">ISO-8859-7</a>
      </td>
      <td>iso_8859_7</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO/IEC_8859-8">ISO-8859-8</a>
      </td>
      <td>iso_8859_8</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO-8859-8-I">ISO-8859-8-I</a>
      </td>
      <td>iso_8859_8_i</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO/IEC_8859-10">ISO-8859-10</a>
      </td>
      <td>iso_8859_10</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO/IEC_8859-13">ISO-8859-13</a>
      </td>
      <td>iso_8859_13</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO/IEC_8859-14">ISO-8859-14</a>
      </td>
      <td>iso_8859_14</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO/IEC_8859-15">ISO-8859-15</a>
      </td>
      <td>iso_8859_15</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO/IEC_8859-16">ISO-8859-16</a>
      </td>
      <td>iso_8859_16</td>
    </tr>
    <tr>
      <td><a href="https://en.wikipedia.org/wiki/KOI8-R">KOI8-R</a></td>
      <td>koi8_r</td>
    </tr>
    <tr>
      <td><a href="https://en.wikipedia.org/wiki/KOI8-U">KOI8-U</a></td>
      <td>koi8_u</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Mac_OS_Roman">macintosh</a>
      </td>
      <td>macintosh</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Windows-874">windows-874</a>
      </td>
      <td>windows_874</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Windows-1250">windows-1250</a>
      </td>
      <td>windows_1250</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Windows-1251">windows-1251</a>
      </td>
      <td>windows_1251</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Windows-1252">windows-1252</a>
      </td>
      <td>windows_1252</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Windows-1253">windows-1253</a>
      </td>
      <td>windows_1253</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Windows-1254">windows-1254</a>
      </td>
      <td>windows_1254</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Windows-1255">windows-1255</a>
      </td>
      <td>windows_1255</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Windows-1256">windows-1256</a>
      </td>
      <td>windows_1256</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Windows-1257">windows-1257</a>
      </td>
      <td>windows_1257</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Windows-1258">windows-1258</a>
      </td>
      <td>windows_1258</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Mac_OS_Cyrillic_encoding"
          >x-mac-cyrillic</a
        >
      </td>
      <td>x_mac_cyrillic</td>
    </tr>
    <tr>
      <td colspan="2">
        <a
          href="https://encoding.spec.whatwg.org/#legacy-multi-byte-chinese-(simplified)-encodings"
          >Legacy multi-byte Chinese (simplified) encodings</a
        >
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/GBK_(character_encoding)">GBK</a>
      </td>
      <td>gb18030</td>
    </tr>
    <tr>
      <td><a href="https://en.wikipedia.org/wiki/GB_18030">gb18030</a></td>
      <td>gbk</td>
    </tr>
    <tr>
      <td colspan="2">
        <a
          href="https://encoding.spec.whatwg.org/#legacy-multi-byte-chinese-(traditional)-encodings"
          >Legacy multi-byte Chinese (traditional) encodings</a
        >
      </td>
    </tr>
    <tr>
      <td><a href="https://en.wikipedia.org/wiki/Big5">Big5</a></td>
      <td>big5</td>
    </tr>
    <tr>
      <td colspan="2">
        <a
          href="https://encoding.spec.whatwg.org/#legacy-multi-byte-japanese-encodings"
          >Legacy multi-byte Japanese encodings</a
        >
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Extended_Unix_Code#EUC-JP"
          >EUC-JP</a
        >
      </td>
      <td>euc_jp</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO/IEC_2022#ISO-2022-JP"
          >ISO-2022-JP</a
        >
      </td>
      <td>iso_2022_jp</td>
    </tr>
    <tr>
      <td><a href="https://en.wikipedia.org/wiki/Shift_JIS">Shift_JIS</a></td>
      <td>shift_jis</td>
    </tr>
    <tr>
      <td colspan="2">
        <a
          href="https://encoding.spec.whatwg.org/#legacy-multi-byte-korean-encodings"
          >Legacy multi-byte Korean encodings</a
        >
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/Extended_Unix_Code#EUC-KR"
          >EUC-KR</a
        >
      </td>
      <td>euc_kr</td>
    </tr>
    <tr>
      <td colspan="2">
        <a
          href="https://encoding.spec.whatwg.org/#legacy-miscellaneous-encodings"
          >Legacy miscellaneous encodings</a
        >
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://encoding.spec.whatwg.org/#replacement">replacement</a>
      </td>
      <td>replacement</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/UTF-16#UTF-16BE">UTF-16BE</a>
      </td>
      <td>utf_16be</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/UTF-16#UTF-16LE">UTF-16LE</a>
      </td>
      <td>utf_16le</td>
    </tr>
    <tr>
      <td>
        <a href="https://encoding.spec.whatwg.org/#x-user-defined"
          >x-user-defined</a
        >
      </td>
      <td>x-user-defined</td>
    </tr>
  </tbody>
</table>

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
