const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

module.exports = async ({
  input,
  output,
  lossless,
  quality,
  speed,
  overwrite,
  verbose,
}) => {
  const outputFilename = path
    .basename(input)
    .replace(path.extname(input), ".avif");
  const outputPath = path.join(
    output ? output : path.dirname(input),
    outputFilename
  );

  try {
    const exists = (await fs.stat(outputPath)).isFile();
    if (exists && !overwrite) {
      if (verbose) {
        process.stdout.write(`${input}: ${outputPath} already exists\n`);
      }
      return;
    }
  } catch (err) {}

  try {
    await sharp(input).avif({ quality, speed, lossless }).toFile(outputPath);
    if (verbose) {
      process.stdout.write(`${input}: created ${outputPath}\n`);
    }
    return true;
  } catch (err) {
    process.stderr.write(`${input}: ${err.message}\n`);
    return false;
  }
};
