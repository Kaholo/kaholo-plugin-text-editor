const FileTextEditor = require('./textEditorService');
const parsers = require('./parsers')

function createFile(action) {
    const fileEditor = new FileTextEditor(action.params.PATH);
    return fileEditor.createFile({
        content: action.params.CONTENT
    });
}

function createVaultFile(action) {
    return createFile(action);
}

function appendToFile(action) {
    const fileEditor = new FileTextEditor(action.params.PATH);
    return fileEditor.appendToFile({
        content: action.params.CONTENT,
        createIfNeeded: !parsers.boolean(action.params.dontCreate),
        returnContent: parsers.boolean(action.params.return)
    });
}

function searchInFile(action) {
    const fileEditor = new FileTextEditor(action.params.PATH);
    return fileEditor.searchInFile({
        regExp: parsers.regex(action.params.REGEX),
        returnContent: parsers.boolean(action.params.return)
    });
}

function replaceText(action) {
    const fileEditor = new FileTextEditor(action.params.PATH);
    return fileEditor.replaceText({
        catchExp: parsers.regex(action.params.REGEX),
        replaceValue: action.params.REPLACE,
        returnContent: parsers.boolean(action.params.return)
    });
}

function getFileContent(action) {
    const fileEditor = new FileTextEditor(action.params.PATH);
    return fileEditor.getFileContent({});
}

module.exports = {
    createFile,
    appendToFile,
    searchInFile,
    replaceText,
    getFileContent,
    createVaultFile
};