/**
 * g mean global
 * the regExp will keep a lastIndex, which make a regExp false one time and true one time
 */

const tagRegExp = new RegExp(/<(?<tagName>.+)>(?<content>.*?)<\/\1>/);

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
  const htmlRegExp = new RegExp(/[^<](?<content>.+?)$/);
  const lastIndex = str.lastIndexOf(">");
  console.log(lastIndex);
  const res = str.match(htmlRegExp);
  console.log(res);
}

/**
 * @function trimText
 * @param {string} html 
 * @return {string} 
 */
function trimText(html){
  if(!tagRegExp.test(html)){
    return `<p><span>${html}</span></p>`;
  }
  html.trim();
  const startTextRegExp = /^([^<]+?)(?=<)/;
  const endTextRegExp = /(?<=>)([^>]+?)$/;
  return html
    .replace(startTextRegExp, "<p><span>$1</span></p>")
    .replace(endTextRegExp, "<p><span>$1</span></p>");
}

/**
 * 
 * @function text2Json
 * @param {string} html
 * @return {object} 
 */
function html2Json(html, first = false){
  const tagRegExp = new RegExp(/<(?<tagName>.+)>(?<content>.*?)<\/\1>/, "g");
  if(first){
    html = trimText(html);
  }
  const reses = html.matchAll(tagRegExp);
  const resList = [];
  for(let res of reses) {
    resList.push({
      tagName: res?.groups.tagName,
      content: html2Json(res?.groups.content)
    })
  }
  if(!resList.length){
    return {
      tagName: "text",
      content: html
    }
  }
  return resList;
}

export { text2Html, html2Json, trimText };
export default Translator;