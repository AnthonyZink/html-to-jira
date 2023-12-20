# Html-To-JIRA Converter

## Description

Html-To-JIRA Converter is a TypeScript library designed to convert HTML content into a JIRA-compatible format. This library is particularly useful for creating Jira issues.

## Installation

To install Html-To-JIRA Converter, you can use npm with the following command:

```shell
npm install html-to-jira
```

## Quickstart

To use the Html-To-JIRA Converter, first import the `HtmlToJsonConverter` class:

```typescript
import { HtmlToJsonConverter } from "html-to-jira";
```

Then, instantiate the class with an HTML document and call the convert method:

```typescript
import { JSDOM } from "jsdom";

const htmlDocument = new JSDOM(`Your HTML Content`);
const converter = new HtmlToJsonConverter(htmlDocument);
const jiraFormattedContent = converter.convert();
```

## Example

```typescript
const converter = new HtmlToJsonConverter(
    new JSDOM("<h1>I'm a heading level one</h1>")
);
const jiraFormattedContent = converter.convert();

// [{
//    "type": "heading",
//    "attrs": {
//        "level": level
//    },
//    "content": [
//        {
//            "type": "text",
//            "text": `I'm a heading level one`
//        }
//    ]
// }]
```

## Supported tags

-   bold `<strong>` or `<b>`
-   headings (h1-h6) `<hX>`
-   italic `<i>`
-   link `<a href="">`
-   ol with li `<ol>`
-   ul with li `<ul>`
-   paragraph `<p>`
-   quote `<blockquote>`
-   rule `<hr>`
-   strike `<del>`
-   underline `<u>`
-   code `<code>`

## Contributions

Contributions are welcome !
