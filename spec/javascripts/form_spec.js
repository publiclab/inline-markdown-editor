describe("Form", function() {

  var editor;

  it("sends AJAX request on form submission", function(done) {

    fixture = loadFixtures('index.html');

    jasmine.Ajax.install();

    var ajaxSpy = spyOn($, "ajax").and.callFake(function(options) {

      if (options === '/wiki/replace/') {

        // http://stackoverflow.com/questions/13148356/how-to-properly-unit-test-jquerys-ajax-promises-using-jasmine-and-or-sinon
        var d = $.Deferred();
        d.resolve(options);
        d.reject(options);
        return d.promise();

      }

    });

    editor = inlineMarkdownEditor({
      replaceUrl: '/wiki/replace/',
      selector: '.markdown',
      onComplete: onComplete
    });

    function onComplete(response) {

      expect(response).not.toBeUndefined();

      jasmine.Ajax.uninstall();
      done();

    }

    $('form.inline-edit-form').submit();

  });

});
