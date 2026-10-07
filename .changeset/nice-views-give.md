---
"iconv-nano": patch
---

feat: remove replacement codec

- Besides not really making sense to have an associated encoder, constructing
  the decoder on Chrome throws an error
