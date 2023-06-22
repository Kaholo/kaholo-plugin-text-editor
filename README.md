# Kaholo Text Editor Plugin
This plugin extends Kaholo's capabilities to create, read, append, search and replace text in text files.

## Newlines
Text files of all types typically end with a newline character. The plugin will therefore attempt to help you do this, for example if you append text that does NOT end with a newline, one will be added for you. In some very unusual cases, for example if you wanted a file to NOT end with a newline character, this could be problematic. There are several work-arounds, including method Replace Text in File with a regex to identify the unwanted newlines and replace them with nothing, or using sed or truncate with the Command Line plugin to remove only the final newline of a file like so:

    file=mytestfile.txt
    size=$(stat -c '%s' "$file")
    truncate -s $(($size-1)) $file

## RegExp
Methods to Search and Replace/Remove text in the file rely on [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) of the type commonly found in Perl, JavaScript, and other programming languages. For those unfamiliar with these it is recommended that one build and test regular expressions on a purpose-built website such as [Regex101](https://regex101.com/).

In some cases a regex may be entered in plain format, for example to match the word "Kaholo" in the text you may simply use that word as the regex. Global and multiline options are assumed. However if you want a case insensitive (Option "i") and non-global (find first match only) search then you must use the flagged expression:

    /kaholo/i

The plugin applies the regex using JavaScript [String.prototype.match(RegExp)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match).

## Method: Create New File
Create a new file with specified content in the specified path.

### Parameter: File Path
The path and file name for the text file to be written on the Kaholo agent. Either absolute or relative paths may be used.

### Parameter: File Content
The text to be written to the file.

### Parameter: Overwrite Existing
In the case where the file already exists and this option is enabled, the file will be overwritten with the provided content.

### Parameter: Return File Content
If enabled, after the file is written the content of the file is also returned to the Final Result in Kaholo. This is especially useful if the content is JSON and might be accessed by downstream actions using the code layer. For example after writing the JSON result from an automated test package to a file, this code might be used to post the "Success" status to a Slack channel:

    `Test status: ${kaholo.actions.TextEditor1.result.status}`

## Method: Append To File
Append the specified content to the end of the specified file. This method can also create new files.

### Parameter: File Path
The path and file name for the text file to be appended on the Kaholo agent. Either absolute or relative paths may be used.

### Parameter: Content
This is the text Content to be appended. If it does not end with a final newline character, one will be added for you. See the above [section on newlines](##Newlines) if this causes issues in your use case.

### Parameter: Don't Create
By default if the file does not yet exist it will be created for you. If this parameter is enabled it will error instead.

### Parameter: Return New Content
If enabled, the entire contents of the file will be returned in the Kaholo execution's Final Result.

## Method: Search In File
Search the content of the specified file for the specified regex pattern. The return value can be either simply `"found": true` or an array of matching strings from the file.

### Parameter: File Path
The path and file name for the text file to be searched on the Kaholo agent. Either absolute or relative paths may be used.

### Parameter: RegExp
The regular expression to use for the search. See section [RegExp](##RegExp) above for further detail.

### Parameter: Return Matches
If enabled, matching strings are returned in the Kaholo execution's Final Result. Otherwise a simple boolean is returned to indicate if the expression was matched or not.

## Method: Replace Text In File
This method is identical to method Search In File except it also replaces the strings that match the expression.

### Parameter: Replace Value
The text with which to replace matches in the text file. If left empty, the matches will be replaced by nothing, effectively just deleted from the file.

## Method: Read File Content
Reads and returns the content of the specified file in the Final Result of the Kaholo action's execution. This is particularly useful for reading JSON files to expose them as objects in the Kaholo code layer. For example the package.json from this plugin could be read, and then the eslint version might be referred to in code as:

    kaholo.actions.TestEditor1.result.devDependencies.eslint

### Parameter: File Path
The path and file name for the text file to be read from the Kaholo agent. Either absolute or relative paths may be used.