/// <reference types="node" />

import { appendFile, mkdir, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const BASE_URL = "https://encoding.spec.whatwg.org";
const DELAY = 5_000;
const TEMP_ENCODINGS_DIR = "temp-encodings";

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

async function* parseEncodingsFromUrls(urls: string[]) {
  for (const url of urls) {
    await sleep(DELAY);
    console.log(`Parsing ${url}...`);
    const encodingIndex = await fetch(new URL(`/${url}`, BASE_URL)).then(
      (res) => res.text(),
    );
    const lines = encodingIndex.split("\n");
    const metadata = lines.reduce<
      Partial<{ identifier: string | undefined; date: string | undefined }>
    >((acc, line) => {
      if (line.startsWith("# Identifier")) {
        acc["identifier"] = line.split("Identifier:")[1]?.trim();
      } else if (line.startsWith("# Date")) {
        acc["date"] = line.split("Date:")[1]?.trim();
      }
      return acc;
    }, {});

    const encodingIndexJson = Object.fromEntries<number>(
      lines
        .filter((line) => !line.startsWith("#") && line.trim().length !== 0)
        .flatMap((line) => {
          const [rawIndex, codePoint, rawChar] = line.trimStart().split("\t");
          const char =
            codePoint !== undefined
              ? String.fromCodePoint(Number(codePoint))
              : codePoint;
          const index = rawIndex !== undefined ? Number(rawIndex) : undefined;

          if (char === undefined || !rawChar?.startsWith(char)) {
            console.warn(
              `The character (${rawChar}) at index ${index} does not match the parsed character (${char})`,
            );
          }
          if (char === undefined || index === undefined) {
            return [];
          }
          return [[char, index]];
        }),
    );

    console.log(`Parsed!`);
    yield { ...metadata, data: encodingIndexJson, url };
  }
}

const generateEncodings = async () => {
  console.log(`Fetching encodings at ${BASE_URL}...`);
  const text = await (await fetch(BASE_URL)).text();

  const urls = Array.from(text.matchAll(/index-[^"]+\.txt/g)).map(
    (regExpArray) => regExpArray[0],
  );
  const uniqueUrls = Array.from(new Set(urls));
  console.log(`Fetched! ${uniqueUrls.length} unique urls found`);

  await mkdir(TEMP_ENCODINGS_DIR, { recursive: true });
  for await (const value of parseEncodingsFromUrls(uniqueUrls)) {
    const fileName = `${TEMP_ENCODINGS_DIR}/${basename(value.url, ".txt").slice("index-".length)}.json`;
    await writeFile(
      fileName,
      `// Identifier: ${value.identifier}\n// Date: ${value.date}\n`,
    );
    await appendFile(fileName, JSON.stringify(value.data));
  }
};

void generateEncodings();
