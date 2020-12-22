const { promisify } = require("util");
const glob = require("glob");

const globP = promisify(glob);

module.exports = (input) => globP(input, { absolute: true, nodir: true });
