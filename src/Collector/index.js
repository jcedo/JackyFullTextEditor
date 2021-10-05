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

/**
 * Collector
 *    _html
 *    _prevHtml
 */
class Collector{
  constructor(element){
    this._html = null;
    this._prevHtml = null;
    this._inputEvent = null;
    const self = this;
    duplexContenteditable(element, function(inputEvent){
      console.log('duplexContenteditable');
      self.updateInnerHtml(this.innerHTML);
      self._inputEvent && self._inputEvent(this.innerHTML)
    })
  }

  updateInnerHtml(curHtml){
    this._prevHtml = this._html;
    this._html = curHtml;
  }

  set inputEvent(fn){
    this._inputEvent = fn;
  }
}

export default Collector;