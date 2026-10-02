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
```

## Supported encodings

- UTF-8

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
