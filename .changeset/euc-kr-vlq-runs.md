---
"iconv-nano": patch
---

Compress all multi-byte reverse indexes (big5, euc-kr, gb18030, jis0208, jis0212, shift_jis) into VLQ-encoded run-length payloads: the shipped index chunks shrink by 69-85% gzipped (euc-kr: about 76 KB to 13 KB), module init no longer parses 7k-24k-entry JSON objects, encode lookups resolve through O(1) two-stage tables materialized from the payloads at module init.
