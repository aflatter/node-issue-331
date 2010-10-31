function returnBar() {
  return ext.bar;
}

function executeReturnBar() {
  return this.ext.returnBar();
}

function returnBarViaWindow() {
  return window.ext.bar();
}

function returnExtViaWindow() {
  return window.ext;
}

function setTypeOfXHR() {
  this.typeOnThis   = (typeof XMLHttpRequest);
  this.typeOnWindow = (typeof window.XMLHttpRequest);
}

var self = this;

if(typeof jQuery != 'undefined') {
  
  jQuery(document).ready(function() {
    self.typeOnLoad = (typeof XMLHttpRequest);
  });

}
