var common = require('../common'),
    assert = common.assert;
    jsdom  = require('jsdom'),
    xhr    = require("./XMLHttpRequest.js");

createWindow = function(fn) {
      var window = jsdom.jsdom().createWindow(),
          document = window.document;
 
      window.XMLHttpRequest = xhr.XMLHttpRequest;

      //jsdom.jQueryify(window, __dirname + '/jquery.js', function() {
        
      var script = document.createElement('script');
      script.src = 'file://' + __dirname + '/foo.js';
      script.onload = function() {
        fn(window);
      }

      //});

    }

    createWindow(function(window) {

      //sys.puts(util.inspect(window));
      sys.puts(window.bar);
            sys.puts(window.x);
  
    });
