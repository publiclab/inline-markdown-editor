describe("Editor", function() {

  var editor;

  beforeAll(function() {
    fixture = loadFixtures('index.html');
    editor = inlineMarkdownEditor({
      replaceUrl: '/wiki/replace/',
      selector: '.markdown'
    });
  });


  it("exists & initializes", function() {
    expect(editor).not.toBeUndefined();
    expect(editor.options).not.toBeUndefined();
    expect(editor.element).not.toBeUndefined();
    expect(editor.sections).not.toBeUndefined();
  });

  it("correctly assesses isEditable (default)", function() {
    var isEditable = editor.options.isEditable
    expect(isEditable('<p></p>')).toBe(false);
    expect(isEditable('****')).toBe(false);
    expect(isEditable('----')).toBe(false);
    expect(isEditable('Just a simple string.')).toBe(false);
  });

  xit("generates the right number of sections", function() {
    expect(editor.sections.length).toBe(4);
    expect($('.inline-section').length).toBe(4);
  });

});
