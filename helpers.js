const os = require("os");
const fs = require("fs/promises");
const { normalize } = require("path");

const homeDirectory = os.homedir();
const isWindowsPlatform = os.platform() === "win32";

async function pathExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

function tryCreateRegexFromString(stringValue) {
  const regexSyntaxMatch = stringValue.match(/^\/(.+)(?<!\\)\/([gmi]*)/);
  const regexBody = regexSyntaxMatch ? regexSyntaxMatch[1] : stringValue;
  const modifiers = regexSyntaxMatch ? regexSyntaxMatch[2] : "gm";
  try {
    return new RegExp(regexBody, modifiers);
  } catch (error) {
    throw new Error(`${stringValue} is not a valid Regular Expression!`);
  }
}

function parsePath(value) {
  let path = value ?? "";

  if (isWindowsPlatform) {
    path = path.replace(/\//g, "\\");
  } else {
    path = path.replace(/\\/g, "/");
  }
  const untildifiedPath = homeDirectory ? path.replace(/^~(?=$|\/|\\)/, homeDirectory) : path;

  return normalize(untildifiedPath);
}

function endingWithNewline(textfile) {
  if (/[\r\n]$/.test(textfile)) {
    return textfile;
  }
  return (`${textfile}\n`);
}

module.exports = {
  tryCreateRegexFromString,
  parsePath,
  pathExists,
  endingWithNewline,
};
