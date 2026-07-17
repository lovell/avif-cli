#!/usr/bin/env node

import fs from "node:fs/promises";
import { constants } from "node:fs";
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
  verbose,
  cwd,
} from "../lib/cli.js";
import convert from "../lib/convert.js";

const avif = async () => {
  const files = await glob([input], { absolute: true, cwd });
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
