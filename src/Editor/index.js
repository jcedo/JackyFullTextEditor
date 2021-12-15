import duplexContenteditable from "@/Collector/ContentEditableListener";
import { text2Html, html2Json, trimText, json2Html } from '@/Translator/index.js';

class Storage{
  constructor(){
    this._domArray = [];
    this._selection = null;
  }
  
  // DOM construction
  set domArray(domArray){
    this._domArray = domArray;
  }

  get domArray(){
    return this._domArray;
  }

  // selection
  set selection(s){
    this._selection = s;
  }

  get selection(){
    return this._selection;
  }
}

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
    this._storage = new Storage();
    const self = this;

    // add Event Listener
    duplexContenteditable(element, function(){
      // html2Json
      const res = html2Json(self.element.innerHTML, true);
      console.log(res);
      const selection = window.getSelection()
      
      // valid and format the html

      // store
      self._storage.domArray = res;
      self._storage.selection = selection;

      // json2Html
      const resHtml = json2Html(res);
      console.log(resHtml);
      self.element.innerHTML = resHtml;
      
      
      if(selection.rangeCount > 0){
        selection.removeAllRanges();
      }
      // const children = self.element.children;
      // const range = document.createRange()
      // range.selectNode(children[children.length-1]);
      // range.collapse()
      // selection.addRange(range);
      // self.element.setSelection(1,1);
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