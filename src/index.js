import '@/index.css';
import Editor from '@/Editor/index.js';
import Translator,{ text2Html, html2Json, trimText} from '@/Translator/index.js';
import { EDITOR_MAIN } from '@/utils/constant.js';

var element = document.createElement('div');
element.setAttribute("contenteditable", true);
element.setAttribute("id", EDITOR_MAIN);

document.body.appendChild(element);

const editor = new Editor(element);