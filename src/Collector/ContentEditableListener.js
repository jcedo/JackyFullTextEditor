var duplexContenteditable = new function () {
  // var useDOMCharacterDataModified = false; 
  var target;
  if (document.attachEvent && document.addEventListener) {
    document.attachEvent("onselectionchange", function () {
      if (target && target.duplexCallback) {
        target.duplexCallback();
      }
    })
  }

  // do not try to use MutationEvent temporary

  // if ("MutationEvent" in window) {
  //   var test = document.createElement("div");
  //   var root = document.body || document.documentElement
  //   root.appendChild(test);
  //   test.addEventListener("DOMCharacterDataModified", function (e) {
  //     useDOMCharacterDataModified = true;
  //   })
  //   try {
  //     //http://www.programcreek.com/java-api-examples/index.php?api=org.w3c.dom.events.MutationEvent
  //     var event = document.createEvent("MutationEvents");
  //     event.initMutationEvent("DOMCharacterDataModified", true, false, null, "x", "y", null, 0);
  //     test.dispatchEvent(event);
  //   } catch (e) {
  //   }
  //   setTimeout(function () {
  //     root.removeChild(test);
  //   })
  // }
  return function (element, callback) {
    if (element.addEventListener) {
      /**
       * IE not support
       * just support DOMCharacterDataModified
       */
      element.addEventListener("input", callback);

      // if (useDOMCharacterDataModified) {//基本上所有浏览器都支持
      //   element.addEventListener("DOMCharacterDataModified", callback);
      // } else {
      // }
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