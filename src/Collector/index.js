import duplexContenteditable from "./Listener.js";
class Collector{
  constructor(text = ""){
    this._prevText = "";
    this._text = text;
    this._inputEvent = null;
  }

  set text(text){
    this._prevText = this._text;
    this._text = text;
  }

  get text(){
    return this._text;
  }

  bindDOM(element) {
    const self = this;
    duplexContenteditable(element, function(mutationEvent){
      self._prevText = self._text;
      self._text = this.innerHTML;
      self._inputEvent(self._text, self._prevText);
      // console.log(window.getSelection());
    })
  }

  set inputEvent(fn){
    this._inputEvent = fn;
  }
}

export default Collector;