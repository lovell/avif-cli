#!/usr/bin/env node

const {
  input,
  output,
  lossless,
  quality,
  speed,
  overwrite,
  verbose,
} = require("../lib/cli");
const glob = require("../lib/glob");
const convert = require("../lib/convert");

const avif = async () => {
  const files = await glob(input);
  if (verbose) {
    process.stdout.write(`Found ${files.length} file(s) matching ${input}\n`);
  }
  const results = await Promise.all(
    files.map((file) =>
      convert({
        input: file,
        output,
        lossless,
        quality,
        speed,
        overwrite,
        verbose,
      })
    )
  );
  process.exit(results.every(Boolean) ? 0 : 1);
};
avif();
