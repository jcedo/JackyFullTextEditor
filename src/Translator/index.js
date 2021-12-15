/**
 * g mean global
 * the regExp will keep a lastIndex, which make a regExp false one time and true one time
 */

// const tagRegExp = new RegExp(/<(?<tagName>.+)>(?<content>.*?)<\/\1>/);

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
 * Will flatten the html tree in array, rerender to DOM by level key
 * @function text2Json
 * @param {string} html
 * @return {object} 
 */

var tempList = [];

const tagRegExp = new RegExp(/<(?<tagName>.+)>(?<content>.*?)<\/\1>/, "g");

function html2Json(html, first = false, level = 0){
  if(first){
    tempList = [];
    html = trimText(html);
  }
  const reses = html.matchAll(tagRegExp);
  // Indicate whether match tagName
  let flag = true;
  for(let res of reses){
    flag = false;
    let matchTagName = res?.groups?.tagName;
    let matchContent = res?.groups?.content;
    tempList.push({ tagName: matchTagName, level })
    html2Json(matchContent, false, level+1)
  }
  if(flag){
    tempList.push({ tagName: "text", content: html, level })
  }
  return tempList;
}

/**
 * json2Html
 * @param {Array<{tagName, content, level}>} domArray
 * @param {boolean} first 
 */

function json2Html(domArray, first){
  let html = "";
  const len = domArray.length;
  let i = 0;
  while(i < len){
    const tag = domArray[i].tagName;
    if(i === len - 1){
      break;
    }
    const curLevel = domArray[i]?.level
    const nextLevel = domArray[i+1]?.level
    if(curLevel > nextLevel){
      // 补后面的tag,加入内容
    }else if(curLevel === nextLevel){
      // 补自己的tag
    }else{
      // 继续拼接前面的tag
    }
  }
  return html;
}

export { text2Html, html2Json, trimText, json2Html };
export default Translator;