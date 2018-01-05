import "../node_modules/amfe-flexible/index.min.js"
import  './tab.js'
import { Slides } from './recommend.js'
import { List } from './list.js'
import { Search } from './search.js'
import { Control } from './control.js'


let recommend = new Slides(document.querySelector('.slides'));

let toplist = new List(document.querySelector('.lists'));

let search = new Search(document.querySelector('.searchContent'));

let control = new Control(document.querySelector('.play'));
