#!/usr/bin/env node

const fs = require("fs").promises;
const { constants } = require("fs");
const path = require("path");
const {
  input,
  target,
  output,
  recursive,
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
  const prompt = `${input.replace(/\\/g, "/")}/**/*.{${target}}`; // Include all files in subdirectories

  const files = await glob([prompt], {
    absolute: true,
    onlyFiles: true,
    deep: recursive ? Infinity : 0, // Adjust depth based on recursive option
  });
  if (verbose) {
    process.stdout.write(
      `Found ${files.length} file(s) matching ${input}\n`
    );
  }
  if (output) {
    try {
      await fs.access(output, constants.W_OK);
    } catch (e) {
      await fs.mkdir(output, { recursive: true });
    }
  }
  const results = await Promise.all(
    files.map((file) => {
      const relativePath = path.relative(input, file); // Correctly calculate relative path
      const outputPath = recursive
        ? path.join(output, path.dirname(relativePath)) // Maintain folder structure in output
        : output; // Use flat structure if not recursive
      return convert({
        input: file,
        output: outputPath,
        lossless,
        quality,
        effort,
        chromaSubsampling,
        keepMetadata,
        overwrite,
        appendExt,
        verbose,
      });
    })
  );
  process.exit(results.every(Boolean) ? 0 : 1);
};

avif();
