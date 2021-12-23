const yargs = require("yargs");

const { argv } = yargs
  .usage("Convert images to AVIF")
  .option("input", {
    type: "string",
    default: "*.{jpg,jpeg,tif,tiff,webp,png,gif,svg}",
    description: "Input file name(s), supports globs/wildcards",
  })
  .option("output", {
    type: "string",
    default: "",
    description: "Output directory",
  })
  .option("quality", {
    type: "number",
    default: 50,
    description:
      "Quality vs file size, 1 (lowest/smallest) to 100 (highest/largest)",
  })
  .option("speed", {
    type: "number",
    default: 5,
    description:
      "CPU effort vs file size, 0 (slowest/smallest) to 8 (fastest/largest)",
  })
  .option("lossless", {
    type: "boolean",
    default: false,
    description: "Use lossless compression",
  })
  .option("chromaSubsampling", {
    type: "string",
    default: "4:4:4",
    description: "Set to '4:2:0' to use chroma subsampling",
  })
  .option("overwrite", {
    type: "boolean",
    default: false,
    description: "Allow existing output files to be overwritten",
  })
  .option("verbose", {
    type: "boolean",
    default: false,
    description: "Write progress to stdout",
  })
  .help("h")
  .alias("h", "help")
  .recommendCommands()
  .version();

module.exports = argv;
