/// <reference types="node" />

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

type Indexes = Record<string, (number | null)[]>;

const ENCODINGS_DIR = fileURLToPath(new URL("../encodings", import.meta.url));

const parseEncodingIndexArray = (encodingIndexArray: Indexes[keyof Indexes]) =>
  encodingIndexArray.reduce<Record<string, number>>((acc, codePoint, index) => {
    const char = codePoint !== null ? String.fromCodePoint(codePoint) : null;
    if (char !== null && !(char in acc)) {
      acc[char] = index;
    }
    return acc;
  }, {});

const main = async () => {
  console.log("Fetching indexes.json from whatwg/encoding...");
  const responses = await fetch(
    `https://raw.githubusercontent.com/whatwg/encoding/refs/heads/main/indexes.json`,
  ).then((response) => [response, response.clone()] as const);
  const [indexes, sha256Hash]: [Indexes, string] = await Promise.all([
    responses[0].json(),
    responses[1]
      .bytes()
      .then((bytes) => crypto.subtle.digest("SHA-256", bytes))
      .then((arrayBuffer) => new Uint8Array(arrayBuffer).toHex()),
  ]);
  console.log("Fetched!");

  console.log("Checking indexes.sha256...");
  const currSha256Hash = await readFile(join(ENCODINGS_DIR, `indexes.sha256`), {
    encoding: "utf-8",
  })
    .then((hash) => hash.split(/\s+/)[0])
    .catch(() => undefined);

  if (currSha256Hash === sha256Hash) {
    console.log(
      `indexes.json has not been modified since it was last processed. SHA-256 hash: ${sha256Hash}`,
    );
    return;
  }

  await writeFile(
    join(ENCODINGS_DIR, `indexes.sha256`),
    `${sha256Hash}  indexes.json`,
    { encoding: "utf-8" },
  );
  console.log(`indexes.sha256 has changed. Updating encodings...`);

  // https://encoding.spec.whatwg.org/#indexes
  const encodings = Object.entries(indexes).flatMap(
    ([encoding, encodingIndexArray]) => {
      // { "gb18030-ranges": [number, number][]; }
      if (encoding === "gb18030-ranges") {
        return [];
      } else if (encoding === "big5") {
        const encodingIndex = parseEncodingIndexArray(
          encodingIndexArray.fill(null, 0, (0xa1 - 0x81) * 157),
        );
        // Object.fromEntries uses "last key wins" rules
        const inverseEncodingIndex = Object.fromEntries(
          encodingIndexArray.flatMap((codePoint, i) =>
            codePoint !== null ? [[String.fromCodePoint(codePoint), i]] : [],
          ),
        );

        [0x2550, 0x255e, 0x2561, 0x256a, 0x5341, 0x5345].forEach(
          (codePoint) => {
            const char = String.fromCodePoint(codePoint);
            encodingIndex[char] = inverseEncodingIndex[char]!;
          },
        );

        return { encoding, data: encodingIndex };
      }

      const encodingIndex = parseEncodingIndexArray(encodingIndexArray);

      if (encoding === "jis0208") {
        return [
          { encoding, data: encodingIndex },
          {
            encoding: "shift_jis",
            data: parseEncodingIndexArray(
              encodingIndexArray.fill(null, 8272, 8835),
            ),
          },
        ];
      }
      return [{ encoding, data: encodingIndex }];
    },
  );

  await Promise.all(
    [
      ...encodings,
      { encoding: "gb18030-ranges", data: indexes["gb18030-ranges"] },
    ].map(({ encoding, data }) =>
      writeFile(join(ENCODINGS_DIR, `${encoding}.json`), JSON.stringify(data), {
        encoding: "utf-8",
      }),
    ),
  );
  console.log(`Encodings updated!`);
};

void main();
