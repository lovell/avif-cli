const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

module.exports = async ({
  input,
  output,
  lossless,
  quality,
  speed,
  chromaSubsampling,
  overwrite,
  appendExt,
  verbose,
}) => {
  let outputFilename = path.basename(input);
  if (appendExt) {
    outputFilename = outputFilename + ".avif";
  } else {
    outputFilename = outputFilename.replace(path.extname(input), ".avif");
  }
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
    await sharp(input)
      .avif({ quality, speed, lossless, chromaSubsampling })
      .toFile(outputPath);
    if (verbose) {
      process.stdout.write(`${input}: created ${outputPath}\n`);
    }
    return true;
  } catch (err) {
    process.stderr.write(`${input}: ${err.message}\n`);
    return false;
  }
};
