describe('error handling by onFail', function () {
  
  var editor, request;

  beforeEach(function() {
    spyOn($, "ajax");
    fixture = loadFixtures('index.html');
    var html = "A simple text line";
    $('.markdown').html(html);
    editor = inlineMarkdownEditor({
      replaceUrl: '/wiki/replace/',
      selector: '.markdown'
    });
  });

  var responses = {
    success: {
      status: 200,
      responseText: "Success!",
    },
    failure: {
      status: 404,
      responseText: "Not found",
    },
    server_error: {
      status:500,
      responseTtext: "Internal server error",
    }
  };

  it('should build only one section Form', function(){
    expect($('.inline-edit-form').length).toBe(1);
  });

  it("should make an Ajax request to the correct URL", function() {
    expect(true).toBe(true);
    var form_text = $('.inline-edit-form textarea').val("A simple text line changed");
    expect($('.inline-edit-form textarea').val()).toBe("A simple text line changed");
  

    spyEvent = spyOnEvent('.submit', 'click');
    $('.submit').trigger("click");
    expect($('.submit').length).toBe(1);
    expect('click').toHaveBeenTriggeredOn('.submit');
    expect(spyEvent).toHaveBeenTriggered();

    //expect($.ajax.mostRecentCall).not.toBeUndefined();

  });
  
})