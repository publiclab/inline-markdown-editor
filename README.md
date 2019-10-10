# inline-markdown-editor

[![Build Status](https://travis-ci.org/publiclab/inline-markdown-editor.svg)](https://travis-ci.org/publiclab/inline-markdown-editor) ![Code Climate](https://codeclimate.com/github/publiclab/inline-markdown-editor/badges/gpa.svg)

An inline wysiwyg markdown document editor based on replacing string subsections. WYSIWYG possible via the [woofmark](https://github.com/bevacqua/woofmark)-based [PublicLab.Editor](https://github.com/publiclab/PublicLab.Editor).

## Basics

`inline-markdown-editor` splits up a Markdown-containing string by double newlines into sections, and parses each into HTML, which it displays. 

It then adds an "edit button" beneath each section, which expands a nice form for editing that section either as Markdown or in rich text with a WYSIWYG editor.

Upon submitting the form, an asynchronous AJAX post request is made to the specified server with parameters `before` and `after`, containing the original subsection markdown and its replacement. The form listens for a `true` or `false` response and updates the section's displayed HTML accordingly. 

For a demo, see:

https://publiclab.github.io/inline-markdown-editor/examples/
                                                           
https://publiclab.github.io/inline-markdown-editor/examples/wysiwyg


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
    // do things to markdown here before it's used to construct the form
    return markdown
  },
  postProcessor: function postProcessContent(element) {
    // do things to element here after the section has been converted to HTML and displayed
  },
  defaultMarkdown: function(markdown) {}, // a markdown parser
  buildSectionForm: function() {}, // return a string containing the form element
  onComplete: function(response, markdown, html, el, uniqueId, form, o) {}, // run on completing AJAX post
  isEditable: function(markdown) {}, // returns boolean; whether a given subsection should get an inline form; default skips HTML and horizontal rules
  extraButtons: { 'fa-icon-name': function(element) {} }, // object with keys of icon names for additional buttons with associated actions for each; returns jQuery element upon construction
  submitSectionForm: function(event, before, after, options) {}, // optional, to override the form submission handling for each subsection; before/after represent the text diff
  editorOptions: {} // any options to pass to the built-in PublicLab.Editor instance
});
```

## Contributing

To install this library for development, you'll need [NodeJS](https://nodejs.org). You can get the detailed instruction on installing node and npm in its official [documentation](https://docs.npmjs.com/getting-started/installing-node).

After installing node and npm run `npm install` from the root directory.

`inline-markdown-editor` uses grunt - the JavaScript task runner - for compilation of the modules. To install grunt run `npm install -g grunt-cli`. You may have to use `sudo` for root privileges.

Make changes to the files in the `/src/` directory, then run `grunt build` to compile into `/dist/inlineMarkdownEditor.js`. This will use `grunt-browserify` to concatenate and include any node modules named in `require()` statements. You'll then be able to try it out in `/examples/index.html`. Run `grunt` and leave it running to build as you go.
## Dependencies
### Node
The easiest way to use and manage node with multiple versions is nvm (node version manager).

To install just execute:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.0/install.sh | bash
```

or 

```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.35.0/install.sh | bash
```

To download, compile, and install the latest release of node, do this:

```sh
nvm install node # "node" is an alias for the latest version
```

To install a specific version of node:

```sh
nvm install 10.10.0 # or 8.9.1, etc
```

The first version installed becomes the default. New shells will start with the default version of node (e.g., `nvm alias default`).

You can list available versions using `ls-remote`:

```sh
nvm ls-remote
```

And then in any new shell just use the installed version:

```sh
nvm use node
```

Or you can just run it:

```sh
nvm run node --version
```

Or, you can run any arbitrary command in a subshell with the desired version of node:

```sh
nvm exec 4.2 node --version
```

You can also get the path to the executable to where it was installed:

```sh
nvm which 5.0
```

## Tests

Tests are set up with Jasmine, and can be run with `npm test`.

## Goals

* configurable editors
  * plan for swappable editors; will need to specify both constructor and onEditorSubmit in processSection
* better modularization of processSection.js
* more tests

## Tests we want

* defaultMarkdown
* preProcessor
* postProcessor
* insertForm: look for the form, the button
