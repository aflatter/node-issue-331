var common = require('../common'),
    assert = common.assert;
    jsdom  = require('jsdom'),
    xhr    = require("../lib/XMLHttpRequest.js");

var window = jsdom.jsdom().createWindow(),
    document = window.document;
 
window.XMLHttpRequest = xhr.XMLHttpRequest;

jsdom.jQueryify(window, __dirname + '/../fixtures/jquery.js', function(window) {

  var script = document.createElement('script');
  script.src = 'file://' + __dirname + '/../fixtures/foo.js';
  script.onload = function() {
    // Passes
    assert.equal(xhr.XMLHttpRequest, window.XMLHttpRequest);

    // Passes
    assert.equal(xhr.XMLHttpRequest, window.window.XMLHttpRequest);

    window.setTypeOfXHR();

    // Passes
    assert.equal(window.typeOnThis,   (typeof xhr.XMLHttpRequest));

    // Fails
    assert.equal(window.typeOnWindow, (typeof xhr.XMLHttpRequest));

    // Fails
    window.jQuery.get('http://google.de', function(data) {
      common.debug(data);
    });
  }
});
