import './index.css';
import render from './renderer';
import { EDITOR_MAIN } from './utils/constant';

function component() {
  var element = document.createElement('div');
  element.id = EDITOR_MAIN
  element.classList.add("main");
  render(element);
  return element;
}

document.body.appendChild(component());