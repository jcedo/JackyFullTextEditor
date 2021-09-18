import { DEFAULT_STYLE } from '../utils/constant';
import Editor from './Editor';
/**
 * 
 * @param {HTMLElement} element
 */
const render = function (element) {
  console.log("render");
  element.append(renderer());
  // ele.appendChild(renderer());
}

/**
 * @return {HtmlElement} editorDom
 */
const renderer = function(){
  const editor = new Editor(DEFAULT_STYLE);
  console.log(editor);
  const editorDom = document.createElement('div');
  editorDom.setAttribute("contenteditable", true);
  let styleText = "";
  for(let key in DEFAULT_STYLE){
    styleText += key + ":" + DEFAULT_STYLE[key] + ";";
  }
  console.log(styleText);
  editorDom.setAttribute("style", styleText);
  return editorDom;
}



export default render;