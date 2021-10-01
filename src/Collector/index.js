import duplexContenteditable from "./ContentEditableListener.js";
/**
 * Collector' task
 *    1. 监听收集这个dom中（div editable）的状态信息
 *      a. 管理innerHtml
 *        i)  Input Event
 *        ii) Mutation Event
 *      b. 管理光标位置
 *        i)   Input Event
 *        ii)  Draggable Event(自定义的鼠标长按与拖动事件)
 *        iii) KeyDown Event(选中的按键组合)
 *      c. 管理选中的区域
 *         
 *    2. 形成一个事件，传递到一些方法中去
 *    3. 
 */
class Collector{
  constructor(element){
    if(!element instanceof HTMLElement){
      throw new TypeError("[Collector Construction]: You must create Collector with HTMLElement");
    }
    if(element.tagName !== "DIV"){
      throw new TypeError("[Collector Construction]: Please use DIV element to avoid some bug");
    }
    if(element.contentEditable !== "true"){
      console.log(element.contentEditable);
      throw new TypeError("[Collector Construction]: The contentEditable of element is false");
    }
    this._state = {
      innerHtml: null,
      cursor: null,
      selection: null
    }
    this._prevState = {
      innerHtml: null,
      cursor: null,
      selection: null
    }

    this._inputEvent = null;
    const self = this;
    duplexContenteditable(element, function(inputEvent){
      console.log('duplexContenteditable');
      self.updateInnerHtml(this.innerHTML);
      self._inputEvent && self._inputEvent(this.innerHTML)
      // send a event
      // console.log(window.getSelection());
    })
  }

  updateInnerHtml(curHtml){
    this._prevState.innerHtml = this._state.innerHtml;
    this._state.innerHtml = curHtml;
  }

  set inputEvent(fn){
    this._inputEvent = fn;
  }

  // set text(text){
  //   this._prevText = this._text;
  //   this._text = text;
  // }

  // get text(){
  //   return this._text;
  // }

  // bindDOM(element) {
  //   const self = this;
  //   duplexContenteditable(element, function(mutationEvent){
  //     self._prevText = self._text;
  //     self._text = this.innerHTML;
  //     self._inputEvent(self._text, self._prevText);
  //     // console.log(window.getSelection());
  //   })
  // }

  // set onInput(fn){
  //   this._event['onInput'] = fn;
  // }
}

export default Collector;