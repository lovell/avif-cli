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
    description: "Output directory, default is same directory as input",
  })
  .option("cwd", {
    type: "string",
    default: process.cwd(),
    description:
      "Directory that input is relative to, defaults to current working directory as reported by process.cwd()",
  })
  .option("quality", {
    type: "number",
    default: 50,
    description:
      "Quality vs file size, 1 (lowest/smallest) to 100 (highest/largest)",
  })
  .option("effort", {
    type: "number",
    default: 4,
    description:
      "CPU effort vs file size, 0 (fastest/largest) to 9 (slowest/smallest)",
  })
  .option("lossless", {
    type: "boolean",
    default: false,
    description: "Use lossless compression",
  })
  .option("chroma-subsampling", {
    type: "string",
    default: "4:4:4",
    choices: ["4:2:0", "4:4:4"],
    description: "Set to '4:2:0' to use chroma subsampling",
  })
  .option("keep-metadata", {
    type: "boolean",
    default: false,
    description: "Keep all metadata (EXIF, ICC, XMP, IPTC)",
  })
  .option("overwrite", {
    type: "boolean",
    default: false,
    description: "Allow existing output files to be overwritten",
  })
  .option("append-ext", {
    type: "boolean",
    default: false,
    description:
      "Append .avif to the file name instead of replacing the current extension (foo.jpg => foo.jpg.avif)",
  })
  .option("verbose", {
    type: "boolean",
    default: false,
    description: "Write progress to stdout",
  })
  .help("h")
  .alias("h", "help")
  .version();

module.exports = argv;
