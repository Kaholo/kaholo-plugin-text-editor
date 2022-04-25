# kaholo-plugin-textEditor
Text editor plugin for Kaholo. Creates file, adds content, search/replace, and reads file for output in Final Results. For other file operations such as `chmod` or `rm`, please use the Command Line plugin instead.

## Method: Create New File
Create a new file with specified content in the specified path.

### Parameters
1. File Path (String) **Required** - The path to save the new file. Including the path of the new file itself.
2. File Content (Text) **Required** - The content to add to the new file.

## Method: Append To File
Append the specified content to the end of the specified file.

### Parameters
1. File Path (String) **Required** - The path of the file to append the new content to.
2. Content (Text) **Required** - The content to append to the file.
3. Don't Create (Boolean) **Optional** - If true and file exists, fail method. If false and file doesn't exist, create a new file with the content.
4. Return New Content (Boolean) **Optional** - If true, return the new content of the file in case of success. If false return a message about status of the action.

## Method: Search In File
Search the content of the specified file for the specified regex pattern.
If specified also return all matches.

### Parameters
1. File Path (String) **Required** - The path of the file to search it's contents.
2. Regexp (String) **Required** - The regex pattern to search in the file.
3. Return Matches (Boolean) **Optional** - If true, also return all matches of the specified regex pattern. If false only return whether the pattern was found.

## Method: Replace Text In File
Replace text in file using the following javascript [method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace).

### Parameters
1. File Path (String) **Required** - The path of the file to do the replace action on.
2. Search Regex Expression (String) **Required** - The regex pattern to catch and replace with the replace value.
3. Replace Value (String) **Required** - The value to replace any matched substring. The replace value can contain special replacement patterns, described [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter).
4. Return New Content (Boolean) **Optional** - If true, return the new content of the file in case of success. If false return a message about status of the action.

## Method: Get File Content
Return the content of the file in the specified path. Fail if file does not exist.

### Parameters
1. File Path (String) **Required** - The path of the file to return it's contents.
