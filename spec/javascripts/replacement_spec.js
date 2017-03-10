describe("Replacement functions", function() {

  var editor;

  it("won't generate an editor for an ambiguous (duplicated) section, where replacement server side could apply to the wrong section", function() {
    fixture = loadFixtures('index.html');
    var html = "Unique text.\n\nDuplicated text.\n\nDuplicated text."
    $('.markdown').html(html);
    editor = inlineMarkdownEditor({
      replaceUrl: '/wiki/replace/',
      selector: '.markdown'
    });
    expect($('.inline-edit-form textarea').length).toBe(1);
  });

});
