const fs = require("fs");
const { path: parsePath } = require("./parsers");

module.exports = class FileTextEditor {
  constructor(path) {
    this.path = path;
    this.fixedPath = parsePath(path);
  }

  async createFile({ content }) {
    try {
      await fs.writeFileSync(this.fixedPath, content);
    } catch (error) {
      throw new Error(`Error creating file ${this.path}: ${error.message || JSON.stringify(error)}`);
    }
    return `Created file ${this.path}.`;
  }

  async appendToFile({ content, createIfNeeded, returnContent }) {
    if (!fs.existsSync(this.fixedPath)) {
      if (createIfNeeded) {
        const result = await this.createFile({ content });
        return returnContent ? await fs.readFileSync(this.fixedPath, "utf8") : result;
      }
      throw new Error(`File ${this.path} doesn't exist!`);
    }
    try {
      await fs.appendFileSync(this.fixedPath, content);
    } catch (error) {
      throw new Error(`Error updating file ${this.path}: ${error.message || JSON.stringify(error)}`);
    }
    return returnContent ? await fs.readFileSync(this.fixedPath, "utf8") : `File ${this.path} updated.`;
  }

  async getFileContent() {
    if (!fs.existsSync(this.fixedPath)) {
      throw new Error(`File ${this.path} wasn't found`);
    }
    try {
      return fs.readFileSync(this.fixedPath, "utf8");
    } catch (error) {
      throw new Error(`Error reading file ${this.path}: ${error.message || JSON.stringify(error)}`);
    }
  }

  async searchInFile({ regExp, returnContent }) {
    const fileContent = await this.getFileContent();
    return returnContent ? [...fileContent.matchAll(regExp)] : regExp.test(fileContent);
  }

  async replaceText({ catchExp, replaceValue, returnContent }) {
    const fileContent = await this.getFileContent();
    const newContent = fileContent.replace(catchExp, replaceValue);
    await this.createFile({ content: newContent });
    return returnContent ? newContent : `File ${this.path} updated.`;
  }
};
