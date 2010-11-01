var common = require('../common'),
    assert = common.assert;

var Script = process.binding("evals").Script;
var sandbox = {x: "x"};
sandbox.window  = sandbox;

var code = "function y()  { return this.x } "         + 
           "function z()  { return window.x } "       +
           "function z1() { return x } "              +
           "function w()  { return window } "         +
           "function w1() { return window.window } "  +
           "var box = {contents: window}; "           +
           "var q = y();"                             +
           "var r = z();";

var result = Script.runInNewContext(code, sandbox);

// Passes 
common.debug("sandbox.r == 'x'");
assert.equal(sandbox.r, "x");

// Passes 
common.debug("sandbox.q == 'x'");
assert.equal(sandbox.q, "x");

// Passes
common.debug("sandbox.w() == sandbox.box.contents");
assert.equal(sandbox.w(), sandbox.box.contents);

// Passes (though not intuitive)
common.debug("sandbox.w() == sandbox");
assert.notEqual(sandbox.w(), sandbox);

// Passes (though not intuitive)
common.debug("sandbox.w() == sandbox.window");
assert.notEqual(sandbox.w(), sandbox.window);

// common.debug(sandbox.w());
// => TypeError: Cannot convert object to primitive value
// common.inspect(sandbox.w());
// => TypeError: Converting circular structure to JSON

// INTERESTING: Passes
// common.debug(sandbox.w1());
// => undefined
common.debug("typeof sandbox.w1() == undefined");
assert.equal(typeof sandbox.w1(), "undefined");

// Fails
common.debug("sandbox.w1() == sandbox.box.contents");
assert.equal(sandbox.w1(), sandbox.box.contents);

// Passes
common.debug("sandbox.w1() == sandbox");
assert.notEqual(sandbox.w1(), sandbox);

// Passes
common.debug("sandbox.w1() == sandbox.window");
assert.notEqual(sandbox.w1(), sandbox.window);

// Passes
common.debug("sandbox.x == 'x'");
assert.equal(sandbox.x, "x");

// Passes
common.debug("sandbox.y() == 'x'");
assert.equal(sandbox.y(), "x");

// Passes
common.debug("sandbox.z1() == 'x'");
assert.equal(sandbox.z1(), "x");

// Fails
common.debug("sandbox.z() == 'x'");
assert.equal(sandbox.z(), "x");
