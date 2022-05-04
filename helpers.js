const os = require("os");
const fs = require("fs/promises");
const { normalize } = require("path");

const homeDirectory = os.homedir();
const isPlatformWindows = os.platform() === "win32";

async function pathExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

function tryCreateRegexFromString(stringValue) {
  try {
    return new RegExp(stringValue, "g");
  } catch (error) {
    throw new Error(`${stringValue} is not a valid Regular Expression!`);
  }
}

function parsePath(value) {
  let path = value ?? "";
  if (isPlatformWindows) {
    path = path.replace(/\//g, "\\");
  } else {
    path = path.replace(/\\/g, "/");
  }
  const untildified = homeDirectory ? path.replace(/^~(?=$|\/|\\)/, homeDirectory) : path;
  return normalize(untildified);
}

module.exports = {
  tryCreateRegexFromString,
  parsePath,
  pathExists,
};
