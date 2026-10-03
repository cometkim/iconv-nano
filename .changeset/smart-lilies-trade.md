---
"iconv-nano": patch
---

feat: update generate-encodings.ts script to parse indexes from whatwg/encoding

- Update generate-encodings.ts script to parse indexes from whatwg/encoding GitHub
- Fix big5.json and gb18030-ranges.json to match whatwg/encoding indexes
- Fix parsing with "first key wins" rule (it only mattered for shift_jis)
