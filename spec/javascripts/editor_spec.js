describe("Editor", function() {

  beforeAll(function() {
    fixture = loadFixtures('index.html');
  });


  it("exists & initializes", function() {

    var editor = inlineMarkdownEditor({
      replaceUrl: '/wiki/replace/',
      selector: '.markdown'
    });

    expect(editor).not.toBeUndefined();
    expect(editor.options).not.toBeUndefined();
    expect(editor.element).not.toBeUndefined();
    expect(editor.sections).not.toBeUndefined();

  });

});
