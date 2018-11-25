let fs = require('fs');

function createFile(action) {
    return new Promise((resolve, reject) => {
        let path = action.params.PATH;
        let content = action.params.CONTENT;
        fs.writeFile(path, content, function (error) {
            if (error) {
                return reject("Error creating file ", error)
            }
            return resolve("Created file ", path);
        });
    });
}

function appendToFile(action) {
    return new Promise((resolve, reject) => {
        let path = action.params.PATH;
        let content = action.params.CONTENT;

        // Asynchronously append data to a file
        // creating the file if it does not yet exist.
        fs.appendFile(path, content, function (err) {
            if (err) {

                return reject("Error appending data to file ", error)

            } else {
                return resolve('file ' + path + ' updated');
            }
        });
    });
}

function searchInFile(action) {
    return new Promise((resolve, reject) => {
        let path = action.params.PATH;
        let exp = action.params.REGEX;
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                return reject({ "error": err });
            }
            let pattern = new RegExp(exp);
            return resolve(pattern.test(data));
        });
    });
}

function replaceText(action) {
    return new Promise((resolve, reject) => {
        let path = action.params.PATH;
        let replaceValue = action.params.REPLACE;
        let exp = action.params.REGEX;
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                return reject({ "error": err });
            }
            let content = data.replace(new RegExp(exp, 'g'), replaceValue);
            fs.writeFile(path, content, 'utf-8', function (err) {
                if (err) {
                    return reject({ "error": err });
                }
                return resolve('text replaced');
            });
        });
    });
}

module.exports = {
    createFile: createFile,
    appendToFile: appendToFile,
    searchInFile: searchInFile,
    replaceText: replaceText
};