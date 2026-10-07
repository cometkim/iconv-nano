---
"iconv-nano": patch
---

fix: use char iterator for index in Shift_JIS and EUC-JP encoders

- Avoids unnecessary `String.fromCodePoint`
