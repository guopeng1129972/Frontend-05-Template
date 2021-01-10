
import {Component,createElement} from "./framework.js";
class Carousel extends Component {
  constructor(){
   super();
   this.attribute=Object.create(null);
  }
  setAttribute(name,value){
    this.attribute[name]=value;
  }
  render(){
    console.log(123);
    console.log(this.attribute.src);
   this.root= document.createElement("div");
   for(let record of this.attribute.src){
     let child=document.createElement("img");
     child.src=record;
    this.root.appendChild(child);
   }
   return this.root;
  }
  mountTo(parent){
    parent.appendChild(this.render());
  }
}

let d=[
  "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2254230662,1479924568&fm=26&gp=0.jpg",
  "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1828617116,965098140&fm=26&gp=0.jpg",
  "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2135378476,4132922244&fm=26&gp=0.jpg",
  "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1228962689,1071890439&fm=11&gp=0.jpg"
]

let a=<Carousel src={d}/>;
a.mountTo(document.body);