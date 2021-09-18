class Editor{
  constructor(style){
    this.background = style.background;
    this.height = style.height;
    this.width = style.width;
    this.color = style.color;
    this.dom = document.createElement('div');
  }

  get dom(){
    return this.dom;
  }

  set dom(a){

  }


}

export default Editor