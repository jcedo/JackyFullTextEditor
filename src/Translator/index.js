const tagRegExp = new RegExp(/<(?<tagName>.+)>(?<content>.*?)<\/\1>/, "g");

class Translator{
  constructor(){

  }

  
}

/**
 * regexp
 * <(.+)>(.+)<\/\1> - <tagname>something</tagname>
 * 
 */

/**
 * Need to translate text outside of 
 * @function text2Html
 * @param {string} text
 * @return {string} 
 */
function text2Html(str){
                              //  <p>a</p>b
  // const htmlRegExp = new RegExp(/[^<](?<content>.+?)$/);
  const lastIndex = str.lastIndexOf(">");
  console.log(lastIndex);
  // const res = str.match(htmlRegExp);
  // console.log(res);
}

/**
 * @function trimText
 * @param {string} html 
 * @return {string} 
 */
function trimText(html){
  if(!tagRegExp.test(html)){
    return `<p>${html}</p>`;
  }
  html.trim();
  const startTextRegExp = /^([^<]+?)(?=<)/;
  const endTextRegExp = /(?<=>)([^>]+?)$/;
  return html
    .replace(startTextRegExp, "<p>$1</p>")
    .replace(endTextRegExp, "<p>$1</p>");
}

/**
 * 
 * @function text2Json
 * @param {string} html
 * @return {object} 
 */
function html2Json(html){
  const tagRegExp = new RegExp(/<(?<tagName>.+)>(?<content>.*?)<\/\1>/, "g");
  html = trimText(html);
  const reses = html.matchAll(tagRegExp);
  for(let res of reses) {
    console.log(res);
  }
}

export { text2Html, html2Json, trimText };
export default Translator;