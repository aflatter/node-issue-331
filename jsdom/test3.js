var common = require('../common'),
    assert = common.assert;

var Script = process.binding("evals").Script;
var sandbox = {x: "x"};
sandbox.window  = sandbox;

var code = "function y() { return this.x } " + 
           "function z() { return window.x } " +
           "function w() { return window } " +
           "var box = {contents: window}; " +
           "var q = y()";

var result = Script.runInNewContext(code, sandbox);

// Just for fun:
// TypeError: Cannot convert object to primitive value
common.debug(sandbox.w());
// TypeError: Converting circular structure to JSON
common.inspect(sandbox.w());

// Passes 
common.debug("sandbox.q == 'x'");
assert.equal(sandbox.q, "x");

// Passes
common.debug("sandbox.w() == sandbox.box.contents");
assert.equal(sandbox.w(), sandbox.box.contents);

// Fails
// TypeError: Converting circular structure to JSON
common.debug("sandbox.w() == sandbox");
assert.equal(sandbox.w(), sandbox);

// Fails
// TypeError: Converting circular structure to JSON
common.debug("sandbox.w() == sandbox.window");
assert.equal(sandbox.w(), sandbox.window);

// Passes
common.debug("sandbox.x == 'x'");
assert.equal(sandbox.x, "x");

// Passes
common.debug("sandbox.y() == 'x'");
assert.equal(sandbox.y(), "x");

// Fails
common.debug("sandbox.z() == 'x'");
assert.equal(sandbox.z(), "x");
