const fs = require("fs/promises");
const { bootstrap } = require("kaholo-plugin-library");
const {
  tryCreateRegexFromString,
  parsePath,
  pathExists,
} = require("./helpers");

async function createFile({
  PATH: path,
  CONTENT: content,
  overwrite,
}) {
  const parsedPath = parsePath(path);
  const fileAlreadyExists = await pathExists(parsedPath);

  if (!overwrite && fileAlreadyExists) {
    throw new Error(`File at ${path} already exists!`);
  }

  try {
    await fs.writeFile(parsedPath, content);
  } catch (error) {
    throw new Error(`Failed to write to a file at ${path}: ${error.message || JSON.stringify(error)}`);
  }

  return fileAlreadyExists ? `File ${path} overwritten.` : `Created file ${path}.`;
}

async function appendToFile({
  PATH: path,
  CONTENT: content,
  return: returnContent,
  dontCreate,
}) {
  let fileOperationResult;
  const doCreateFile = !dontCreate;

  const parsedPath = parsePath(path);
  const passedPathExists = await pathExists(parsedPath);

  if (!passedPathExists && !doCreateFile) {
    throw new Error(`File ${path} doesn't exist!`);
  }

  if (!passedPathExists && doCreateFile) {
    fileOperationResult = await createFile({ PATH: path, CONTENT: content, overwrite: true });
  } else {
    try {
      await fs.appendFile(parsedPath, content);
    } catch (error) {
      throw new Error(`Failed to update a file at ${path}: ${error.message || JSON.stringify(error)}`);
    }
    fileOperationResult = `File ${path} updated.`;
  }

  return returnContent ? getFileContent({ PATH: path }) : fileOperationResult;
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
  await createFile({
    PATH: path,
    CONTENT: newContent,
    overwrite: true,
  });

  return returnContent ? newContent : `File ${path} updated.`;
}

async function getFileContent({ PATH: path }) {
  const parsedPath = parsePath(path);
  if (!await pathExists(parsedPath)) {
    throw new Error(`File ${path} wasn't found`);
  }

  try {
    return await fs.readFile(parsedPath, "utf8");
  } catch (error) {
    throw new Error(`Failed to read content of a file at ${path}: ${error.message || JSON.stringify(error)}`);
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
