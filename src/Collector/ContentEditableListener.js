var duplexContenteditable = new function () {
  var target;
  if (document.attachEvent && document.addEventListener) {
    document.attachEvent("onselectionchange", function () {
      if (target && target.duplexCallback) {
        target.duplexCallback();
      }
    })
  }
  return function (element, callback) {
    if (element.addEventListener) {
      element.addEventListener("input", callback);
    } else {
      var oldValue = NaN;
      element.attachEvent("onfocus", function (e) {
        target = element;
      })
      element.attachEvent("onblur", function (e) {
        target = null;
        oldValue = NaN;
      })
      function cb() {
        var curValue = element.innerHTML
        if (curValue !== oldValue) {
          oldValue = curValue;
          // past this,curValue and oldValue to callback
          callback.call(element);
        }
      }
      element.duplexCallback = cb;
      element.attachEvent("onkeyup", cb);
    }
  }
}

export default duplexContenteditable;