import { range } from 'lodash';
import { text2Html, html2Json, trimText } from '../Translator/index.js';

function getCaretPosition(ctrl) {
  // IE < 9 Support 
  if (document.selection) {
      ctrl.focus();
      var range = document.selection.createRange();
      var rangelen = range.text.length;
      range.moveStart('character', -ctrl.value.length);
      var start = range.text.length - rangelen;
      return {
          'start': start,
          'end': start + rangelen
      };
  } // IE >=9 and other browsers
  else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
      return {
          'start': ctrl.selectionStart,
          'end': ctrl.selectionEnd
      };
  } else {
      return {
          'start': 0,
          'end': 0
      };
  }
}

function setCaretPosition(ctrl, start, end) {
  // IE >= 9 and other browsers
  if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(start, end);
  }
  // IE < 9 
  else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
  }
}

let lastEditRange;

function targetNode(node){
  let children = node.children;
  if(children && children.length){
    return targetNode(node.children[children.length - 1]);
  }else{
    if(node.childNodes){
      return node.childNodes[0];
    }
    return node;
  }
}

class Renderer {
  constructor(element) {
    this._element = element;
  }

  bindCollector(collector) {
    const self = this;
    collector.inputEvent = function (text) {
      const selection = window.getSelection();
      range = selection.getRangeAt(0);
      let textNode = range.startContainer;
      let rangeStartOffset = range.startOffset;
      console.log(rangeStartOffset);
      const html = trimText(text);
      // will clear the range when we set the new html
      self._element.innerHTML = html;
      
      selection.removeAllRanges();
      
      // need to create a new range
      let newRange = document.createRange();
      const target = targetNode(self._element);
      // newRange.selectNode(target, target.length);
      // You need to setStart on the #text dom
      newRange.setStart(target, target.length);
      newRange.collapse(true);
      selection.addRange(newRange);
    }
  }

}

export default Renderer;