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
  try {
    return new RegExp(stringValue, "g");
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

function logToActivityLog(message) {
  // TODO: Change console.error to console.info
  // Right now (Kaholo v4.1.2.1) console.info
  // does not print messages to Activity Log
  // Jira ticket: https://kaholo.atlassian.net/browse/KAH-3636
  console.error(message);
}

module.exports = {
  tryCreateRegexFromString,
  parsePath,
  pathExists,
  logToActivityLog,
};
