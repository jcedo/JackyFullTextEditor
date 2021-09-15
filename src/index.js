
function component() {
  var element = document.createElement('div');

  element.innerHTML = "a";

  return element;
}

document.body.appendChild(component());