---
"iconv-nano": patch
---

perf: switch to compact array format for single-byte encodings

- Reduces bundle size by 15.68 kB
- Improves performance substantially by using runtime index keyed by code point
  instead of string (goes from throughput of min. 10000 to min. 60000 in CI)
