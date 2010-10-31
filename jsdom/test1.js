var common = require('../common')
    jsdom = require('jsdom'),
    assert = common.assert;

var window = jsdom.jsdom().createWindow(),
    document = window.document;

var ext = {
  bar: "bar",
  returnBar: function() { return this.bar; }
}

window.ext = ext;

var script = document.createElement('script');
script.src = 'file://' + __dirname + '/../fixtures/foo.js';
script.onload = function() {
  // Passes
  assert.equal(window.ext.returnBar(), "bar");

  // Passes
  assert.equal(window.returnBar(), "bar");

  // Passes
  assert.equal(window.executeReturnBar(), "bar");

  // Passes
  assert.equal(window.window.returnBar(), "bar");

  // Fails
  assert.equal(window.returnExtViaWindow(), ext);

  // Fails
  assert.equal(window.returnBarViaWindow(), "bar");
}
