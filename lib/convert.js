const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

module.exports = async ({
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
}) => {
  let outputFilename = path.basename(input);
  if (appendExt) {
    outputFilename = outputFilename + ".avif";
  } else {
    outputFilename = outputFilename.replace(path.extname(input), ".avif");
  }
  const outputPath = path.join(
    output ? output : path.dirname(input),
    outputFilename,
  );

  try {
    const exists = (await fs.stat(outputPath)).isFile();
    if (exists && !overwrite) {
      if (verbose) {
        process.stdout.write(`${input}: ${outputPath} already exists\n`);
      }
      return true;
    }
  } catch (err) {}

  try {
    const pipeline = sharp(input).avif({
      quality,
      effort,
      lossless,
      chromaSubsampling,
    });
    if (keepMetadata) {
      pipeline.keepMetadata();
    }
    await pipeline.toFile(outputPath);
    if (verbose) {
      process.stdout.write(`${input}: created ${outputPath}\n`);
    }
    return true;
  } catch (err) {
    process.stderr.write(`${input}: ${err.message}\n`);
    return false;
  }
};
