# kaholo-plugin-textEditor
Text editor plugin for Kaholo

## Methods and Parameters

### Method: Create FIle
**Description:**

This method will create a file with specific content in a selected path

**Parameters**
1) Path - the place you want to create this file. The path will include the file name.
2) Content - the content to add to the new file.

### Method: Append to file
**Description:**

This method will add text to the end of the file

**Parameters**
1) Path - The full path including the file name to add the text.
2) Content - the text you wish to append to the file in the path above.

### Method: Search in file
**Description:**

This method will search for a text in a file using [Regular Expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

**Parameters**
1) Path - The full path including the file name to search the text.
2) RegEx - The regular expression pattern

### Method: Replace Text
**Description:**

This method will replace a text with another text based on [Regular Expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

**Parameters**
1) Path - Path and file to search the text.
2) Regex - Regular expression to find the selected text
3) Replace - the content that will override the old content
