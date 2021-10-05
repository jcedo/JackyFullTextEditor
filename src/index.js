import './index.css';
import Editor from './Editor/index';
// import Collector from './Collector/index';
// import Renderer from './Renderer/index'
import Translator,{ text2Html, html2Json, trimText} from './Translator/index.js';
import { EDITOR_MAIN } from './utils/constant.js';

var element = document.createElement('div');
element.setAttribute("contenteditable", true);
element.setAttribute("id", EDITOR_MAIN);

// var collector = new Collector(element);
// var renderer = new Renderer(element);
// renderer.bindCollector(collector);
// collector.bindDOM(element);
// collector.onInput = function(curValue, prevValue) {
//   // console.log(prevValue);
//   // console.log(curValue);
//   html2Json(curValue);
//   // console.log(trimText(curValue));
// }

// function handleMouseUp(event) {
//   console.log("-- mouseup --");
//   const endSelection = window.getSelection();
//   console.log(endSelection.focusOffset);
//   window.removeEventListener("mouseup", handleMouseUp);
// }

// element.addEventListener("mousedown", function(event) {
//   console.warn("start");
//   console.log("-- mousedown --");
//   const startSelection = window.getSelection();
//   console.log(startSelection.focusOffset);
//   window.addEventListener("mouseup", handleMouseUp)
// })

// var translator = new Translator();
document.body.appendChild(element);

const editor = new Editor(element);