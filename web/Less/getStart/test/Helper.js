export function addStyle(styleText) {

  var head = document.head;

  var styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.textContent = styleText;

  head.appendChild(styleElement);
}

export function addDiv(div_id = "", div_class = "") {

  var body = document.body;

  console.log("addDiv div_id : ", div_id)
  console.log("addDiv div_class : ", div_class)

  var divElement = document.createElement('div');
  divElement.id = div_id;
  divElement.className = div_class;

  body.appendChild(divElement);

}

export function appendDiv(element_id, div_id = "", div_class = "") {

  console.log("appendDiv div_id : ", div_id)
  console.log("appendDiv div_class : ", div_class)

  var appendElement = document.getElementById(element_id);

  var divElement = document.createElement('div');
  divElement.id = div_id;
  divElement.className = div_class;

  appendElement.appendChild(divElement);

}


module.exports.addStyle = addStyle
module.exports.addDiv = addDiv


