// import Collector from '../Collector/index';
// import Renderder from '../Renderer/index';
import duplexContenteditable from "../Collector/ContentEditableListener";
import { text2Html, html2Json, trimText } from '../Translator/index.js';

/**
 * Editor
 * 
 * private:
 *    _element HTMLElement
 *    _collector Collector
 *    _renderer  Renderer
 */

class Editor{
  constructor(element) {
    if (!element instanceof HTMLElement) {
      throw new TypeError("[Collector Construction]: You must create Collector with HTMLElement");
    }
    if (element.tagName !== "DIV") {
      throw new TypeError("[Collector Construction]: Please use DIV element to avoid some bug");
    }
    if (element.contentEditable !== "true") {
      throw new TypeError("[Collector Construction]: The contentEditable of element is false");
    }
    this.element = element;
    const self = this;
    // this._collector = new Collector(element);
    // this._renderer = new Renderder(element);
    duplexContenteditable(element, function(){
      // const text = self.element.innerHTML;
      // const selection = window.getSelection();
      // const range = selection.getRangeAt(0);
      // let textNode = range.startContainer;
      // let rangeStartOffset = range.startOffset;
      // console.log(rangeStartOffset);
      // const html = trimText(text);
      // // will clear the range when we set the new html
      // self.element.innerHTML = html;
      
      // selection.removeAllRanges();
      
      // // need to create a new range
      // let newRange = document.createRange();
      // const target = targetNode(self.element);
      // // newRange.selectNode(target, target.length);
      // // You need to setStart on the #text dom
      // newRange.setStart(target, target.length);
      // newRange.collapse(true);
      // selection.addRange(newRange);
      console.log(html2Json(self.element.innerHTML, true));
    })
  }
}

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

export default Editor;