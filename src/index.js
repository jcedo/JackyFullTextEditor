import './index.css';
import Collector from './Collector/index.js';
import Translator,{ text2Html, html2Json, trimText} from './Translator/index.js';
import { EDITOR_MAIN } from './utils/constant.js';

var element = document.createElement('div');
element.setAttribute("contenteditable", true);
element.setAttribute("id", EDITOR_MAIN);

var collector = new Collector("");
collector.bindDOM(element);
collector.inputEvent = function(curValue, prevValue) {
  // console.log(prevValue);
  // console.log(curValue);
  html2Json(curValue);
  // console.log(trimText(curValue));


}

// var translator = new Translator();

document.body.appendChild(element);