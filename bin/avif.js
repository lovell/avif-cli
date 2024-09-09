#!/usr/bin/env node

const fs = require("fs").promises;
const { constants } = require("fs");
const {
  input,
  output,
  lossless,
  quality,
  effort,
  chromaSubsampling,
  keepMetadata,
  overwrite,
  appendExt,
  verbose,
} = require("../lib/cli");
const { glob } = require("tinyglobby");
const convert = require("../lib/convert");

const avif = async () => {
  const files = await glob([input], { absolute: true });
  if (verbose) {
    process.stdout.write(`Found ${files.length} file(s) matching ${input}\n`);
  }
  if (output) {
    try {
      await fs.access(output, constants.W_OK);
    } catch (e) {
      await fs.mkdir(output, { recursive: true });
    }
  }
  const results = await Promise.all(
    files.map((file) =>
      convert({
        input: file,
        output,
        lossless,
        quality,
        effort,
        chromaSubsampling,
        keepMetadata,
        overwrite,
        appendExt,
        verbose,
      }),
    ),
  );
  process.exit(results.every(Boolean) ? 0 : 1);
};
avif();
