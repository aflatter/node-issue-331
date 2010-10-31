var common = require('../common'),
    assert = common.assert;

var Script = process.binding("evals").Script;
var sandbox = {x: "x"};
sandbox.window  = sandbox;

var code = "function y() { return this.x }" + 
           "function z() { return window.x }";

var result = Script.runInNewContext(code, sandbox);

// Passes
common.debug("x");
assert.equal(sandbox.x, "x");

// Passes
common.debug("y");
assert.equal(sandbox.y(), "x");

// Fails
common.debug("z");
assert.equal(sandbox.z(), "x");
