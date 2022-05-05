const fs = require("fs/promises");
const { bootstrap } = require("kaholo-plugin-library");
const { tryCreateRegexFromString, parsePath, pathExists } = require("./helpers");

async function createFile({
  PATH: path,
  CONTENT: content,
}) {
  const parsedPath = parsePath(path);

  try {
    await fs.writeFile(parsedPath, content);
  } catch (error) {
    throw new Error(`Error creating file ${path}: ${error.message || JSON.stringify(error)}`);
  }

  return `Created file ${path}.`;
}

async function appendToFile({
  PATH: path,
  CONTENT: content,
  return: returnContent,
  dontCreate,
}) {
  const parsedPath = parsePath(path);
  if (!pathExists(parsedPath)) {
    if (!dontCreate) {
      const createFileResult = await createFile({ PATH: path, CONTENT: content });
      return returnContent ? getFileContent({ PATH: path }) : createFileResult;
    }
    throw new Error(`File ${path} doesn't exist!`);
  }

  try {
    await fs.appendFile(parsedPath, content);
  } catch (error) {
    throw new Error(`Error updating file ${path}: ${error.message || JSON.stringify(error)}`);
  }

  return returnContent ? getFileContent({ PATH: path }) : `File ${path} updated.`;
}

async function searchInFile({
  PATH: path,
  REGEX: searchRegex,
  return: returnContent,
}) {
  const parsedPath = parsePath(path);
  const parsedRegex = tryCreateRegexFromString(searchRegex);
  const fileContent = await getFileContent({ PATH: parsedPath });

  return (
    returnContent
      ? { matches: [...fileContent.matchAll(parsedRegex)] }
      : { found: parsedRegex.test(fileContent) }
  );
}

async function replaceText({
  PATH: path,
  REGEX: replaceByRegex,
  REPLACE: replaceValue,
  return: returnContent,
}) {
  const parsedRegex = tryCreateRegexFromString(replaceByRegex);
  const fileContent = await getFileContent({ PATH: path });

  const newContent = fileContent.replace(parsedRegex, replaceValue);
  await createFile({ PATH: path, CONTENT: newContent });

  return returnContent ? newContent : `File ${path} updated.`;
}

async function getFileContent({ PATH: path }) {
  const parsedPath = parsePath(path);
  if (!pathExists(parsedPath)) {
    throw new Error(`File ${path} wasn't found`);
  }

  try {
    return await fs.readFile(parsedPath, "utf8");
  } catch (error) {
    throw new Error(`Error reading file ${path}: ${error.message || JSON.stringify(error)}`);
  }
}

module.exports = bootstrap({
  createFile,
  appendToFile,
  searchInFile,
  replaceText,
  getFileContent,
  createVaultFile: createFile,
});
