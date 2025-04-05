const yargs = require("yargs");

const { argv } = yargs
  .usage("Convert images to AVIF")
  .option("input", {
    type: "string",
    default: process.cwd().replace(/\\/g, "/"),
    description:
      "Input directory, Default is the absolute path to the directory that invoked this.",
  })
  .alias("i", "input")
  .option("target", {
    type: "string",
    default: "jpg,jpeg,tif,tiff,webp,png,gif,svg",
    description:
      "Extensions of the file to be converted. Separated by commas without spaces",
  })
  .option("output", {
    type: "string",
    default: "",
    description: "Output directory, default is same directory as input",
  })
  .alias("o", "output")
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
  .option("recursive", {
    type: "boolean",
    default: false,
    description: "Converts the contents of all subfiles to the same structure.", // Process subdirectories recursively
  })
  .alias("r", "recursive") // Alias for recursive option
  .help("h")
  .alias("h", "help")
  .version()
  .alias("v", "version");

module.exports = argv;
