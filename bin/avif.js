#!/usr/bin/env node
import fs, { constants } from "node:fs/promises";
import path from "node:path";
import { glob } from "tinyglobby";

import {
  input,
  output,
  lossless,
  quality,
  effort,
  chromaSubsampling,
  keepMetadata,
  overwrite,
  appendExt,
  dryRun,
  maxDepth,
  verbose,
  cwd,
} from "../lib/cli.js";
import convert from "../lib/convert.js";

const avif = async () => {
  const files = await glob([input], {
    absolute: true,
    cwd,
    deep: maxDepth,
    onlyFiles: true,
  });
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
        output: output && path.join(output, path.relative(cwd, file)),
        lossless,
        quality,
        effort,
        chromaSubsampling,
        keepMetadata,
        overwrite,
        appendExt,
        dryRun,
        verbose,
      }),
    ),
  );
  process.exit(results.every(Boolean) ? 0 : 1);
};
avif();
