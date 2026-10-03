# iconv-nano

[github-actions]: https://www.github.com/jeremy-code/iconv-nano/actions/workflows/ci.yml
[github-actions-badge]: https://www.github.com/jeremy-code/iconv-nano/actions/workflows/ci.yml/badge.svg
[license-badge]: https://img.shields.io/github/license/jeremy-code/iconv-nano
[npm-version-badge]: https://img.shields.io/npm/v/iconv-nano
[npm-package]: https://www.npmjs.com/package/iconv-nano

[![GitHub Actions][github-actions-badge]][github-actions] [![License][license-badge]](LICENSE) [![NPM version][npm-version-badge]][npm-package]

You probably shouldn't use this for now.

I'm waiting on ESM [namespace imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#namespace_import) in Rolldown ([rolldown/rolldown#7874](https://github.com/rolldown/rolldown/issues/7874)) to be supported. It looks like it will be coming on Rolldown 1.4.

Documentation is avaliable at this URL: https://npmx.dev/package-docs/iconv-nano.

## Usage

```js
import * as iconv from "iconv-nano";

iconv.utf8.encode("😅").toHex(); // "f09f9885"
iconv.utf8.decode(Uint8Array.fromHex("f09f9885")); // "😅"

iconv.ascii.encode("😅").toHex(); // "3f3f"
iconv.ascii.decode(Uint8Array.fromHex("3f3f")); // "??"

iconv.utf16.encode("😅", { endianness: "little-endian" }).toHex(); // "3dd805de"
iconv.utf16.decode(Uint8Array.fromHex("3dd805de")); // "😅"
```

## Supported encodings

- UTF-8
- IBM866
- ISO-8859-2
- ISO-8859-3
- ISO-8859-4
- ISO-8859-5
- ISO-8859-6
- ISO-8859-7
- ISO-8859-8
- ISO-8859-8-1
- ISO-8859-10
- ISO-8859-13
- ISO-8859-14
- ISO-8859-15
- ISO-8859-16
- KOI8-R
- KOI8-U
- macintosh
- windows-874
- windows-1250
- windows-1251
- windows-1252
- windows-1253
- windows-1254
- windows-1255
- windows-1256
- windows-1257
- windows-1258
- x-mac-cyrillic
- utf-16
- utf-16be
- utf-16le
- shift_jis

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
