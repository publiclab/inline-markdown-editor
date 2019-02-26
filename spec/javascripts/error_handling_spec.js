describe('error handling by onFail', function () {

  var editor, html = "A simple text line";

  beforeEach(function() {
    fixture = loadFixtures('index.html');
    $('.markdown').html(html);
    editor = inlineMarkdownEditor({
      replaceUrl: '/wiki/replace/',
      selector: '.markdown'
    });
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it("should call onFail", function(){
    spyOn(editor.options, "onComplete");
    spyOn(editor.options, "onFail");

    spyOn($, "post").and.callFake(function(options) {
      //here options is /wiki/replace/  
      var d = $.Deferred();
      d.reject("this is the response");     
      return d.promise();
    });
  
    $('.inline-edit-btn').click(); // generate editor by clicking the pencil icon
    $('.inline-edit-form button.submit').click(); //click the save button in that form to send the post request

    expect(editor.options.onComplete).not.toHaveBeenCalled();
    expect(editor.options.onFail).toHaveBeenCalled();
  });

  // we are seeing response of "false" when plots2 fails to perform a replacement; adjusting here to read that as a failure
  it("should correctly report 'false' string response as a failure, even with 200 response code", function(){
    spyOn(editor.options, "onComplete");
    spyOn(editor.options, "onFail");

    spyOn($, "post").and.callFake(function(options) {
      //here options is /wiki/replace/  
      var d = $.Deferred();
      d.then("false").done(); 
      return d.promise();
    });
  
    $('.inline-edit-btn').click(); // generate editor by clicking the pencil icon
    $('.inline-edit-form button.submit').click(); //click the save button in that form to send the post request

    expect(editor.options.onComplete).not.toHaveBeenCalled();
    expect(editor.options.onFail).toHaveBeenCalled();
  });
  
})
