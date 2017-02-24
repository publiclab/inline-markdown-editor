# inline-markdown-editor

An inline wysiwyg markdown document editor based on replacing string subsections. WYSIWYG possible via the [woofmark](https://github.com/bevacqua/woofmark)-based [PublicLab.Editor](https://github.com/publiclab/PublicLab.Editor).

## Basics

`inline-markdown-editor` splits up a Markdown-containing string by double newlines into sections, and parses each into HTML, which it displays. 

It then adds an "edit button" beneath each section, which expands a nice form for editing that section either as Markdown or in rich text with a WYSIWYG editor.

Upon submitting the form, an asynchronous AJAX post request is made to the specified server with parameters `before` and `after`, containing the original subsection markdown and its replacement. The form listens for a `true` or `false` response and updates the section's displayed HTML accordingly. 

For a demo, see:

https://publiclab.github.io/inline-markdown-editor

https://publiclab.github.io/inline-markdown-editor/wysiwyg


## Usage

For an easy start, you can begin using `inline-markdown-editor` by pointing it at a markdown-containing element by its selector, and specifying a URL to send changes to.

```js
inlineMarkdownEditor({
  replaceUrl: '/wiki/replace/',
  selector: '.markdown'
});
```

You can also specify filters to run on the raw original markdown before display, and afterwards upon the displayed DOM element, as well as override several other defaults:

```js
inlineMarkdownEditor({
  replaceUrl: '/wiki/replace/' + wiki_id,
  selector: '.markdown',
  preProcessor: function preProcessMarkdown(markdown) {
    // do things to markdown here
    return markdown
  },
  postProcessor: function postProcessContent(element) {
    // do things to element here
  },
  defaultMarkdown: function(markdown) {}, // a markdown parser
  buildSectionForm: function() {}, // return a string containing the form element
  onComplete: function(response, markdown, html, el, uniqueId, form, o) {}, // run on completing AJAX post
  isEditable: function(markdown) {} // returns boolean; whether a given subsection should get an inline form; default skips HTML and horizontal rules
  
});
```

## Goals

* configurable editors
* better modularization of processSection.js
* more tests

## Tests we want

* count sections
* check that it doesn't add a form for whitespace or hrs
* defaultMarkdown
* preProcessor
* postProcessor
* insertForm: look for the form, the button
* look for the textarea
