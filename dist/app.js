!function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";function i(){var e=a(function(){var e=document.querySelectorAll("img");Array.prototype.filter.call(e,function(e){return"lazyload"==e.className}).forEach(function(e){s(e)&&(e.src=e.dataset.src,e.className="")})},500);window.addEventListener("scroll",e),window.dispatchEvent(new Event("scroll"))}function s(e){var t=e.getBoundingClientRect(),n=t.left,i=t.top,s=t.right,a=t.bottom,o=document.documentElement.clientWidth,r=document.documentElement.clientHeight;return(n>0&&n<o||s>0&&s<o)&&(i>0&&i<r||a>0&&a<r)}function a(e,t){var n=void 0,i=void 0;return function s(){var a=+new Date,o=a-n;!n||o>=t?(n=a,e()):o<t&&(clearTimeout(i),i=setTimeout(s,t-o))}}Object.defineProperty(t,"__esModule",{value:!0}),t.lazyload=i},function(e,t,n){"use strict";n(2);var i=n(3),s=n(6),a=n(7),o=n(8);new i.Slides(document.querySelector(".slides")),new s.List(document.querySelector(".lists")),new a.Search(document.querySelector(".searchContent")),new o.Control(document.querySelector(".play"))},function(e,t,n){"use strict";document.querySelector(".tab").addEventListener("click",function(e){var t=document.querySelector(".tab"),n=e.target,i=n.dataset.name;if("tab"==n.parentNode.className){for(var s=0;s<t.children.length;s++){t.children[s].classList.remove("main");var a=t.children[s].dataset.name;document.querySelector("."+a+"Content").style.display="none"}n.classList.add("main"),document.querySelector("."+i+"Content").style.display="block",window.dispatchEvent(new Event("scroll"))}for(var o=0;o<t.children.length;o++)if(t.children[o].className.match(/main/g)){var r=t.children[o].dataset.name;document.querySelector("."+r+"Content").style.display="block"}})},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Slides=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=n(4),o=n(5),r=n(0);t.Slides=function(){function e(t){i(this,e),this.$el=t,this.$slidesA=this.$el.querySelector(".slides-A"),this.$slidesB=this.$el.querySelector(".slides-B"),this.width=document.body.clientWidth,this.n=0,this.m=0,this.time=0,this.loading()}return s(e,[{key:"loading",value:function(){fetch("https://music-mlzctytemu.now.sh").then(function(e){return e.json()}).then(function(e){return e.data}).then(this.view.bind(this))}},{key:"onloading",value:function(e){document.querySelector(".recommend-loading").style.display=e}},{key:"view",value:function(e){this.onloading("none");var t=e,n=t.slider.map(function(e){return"<a href="+e.linkUrl+">\n                        <img src="+e.picUrl+">\n                    </a>"}).join("");this.$slidesA.innerHTML=n,this.$slidesB.innerHTML=n,this.imgWidth(),this.loopTime();new a.Radio({el:document.querySelector(".radio"),data:t.radioList}),new o.HotSong({el:document.querySelector(".hotSong"),data:t.songList});(0,r.lazyload)()}},{key:"imgWidth",value:function(){for(var e=this.$el.querySelectorAll("img"),t=e.length,n=0;n<t;n++)e[n].style.width=this.width+"px"}},{key:"slidesALoop",value:function(){this.$slidesA.style.transform="translateX(-"+this.n*this.width+"px)"}},{key:"slidesBLoop",value:function(){this.$slidesB.style.transform="translateX(-"+this.m*this.width+"px)"}},{key:"check",value:function(){5==this.n&&(this.$slidesB.style.transform="translateX(0px)",this.$slidesB.style.display="flex",this.$slidesA.style.display="none",this.$slidesA.style.transform="translateX(0)",this.m=0),5==this.m&&(this.$slidesA.style.transform="translateX(0px)",this.$slidesA.style.display="flex",this.$slidesB.style.display="none",this.$slidesB.style.transform="translateX(0)",this.n=0,this.time=0)}},{key:"onlyTime",value:function(){this.n>=5&&this.slidesBLoop(),this.m>=5&&this.slidesALoop()}},{key:"ex",value:function(){this.time<=5&&this.n<=5&&(this.slidesALoop(),this.$slidesB.style.transform="translateX("+this.width+"px)"),this.check(),this.onlyTime(),this.m+=1,this.n+=1,this.time+=1,setTimeout(this.ex.bind(this),2e3)}},{key:"loopTime",value:function(){setTimeout(this.ex.bind(this),1e3)}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.Radio=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e),this.$el=t.el,this.data=t.data,this.view()}return s(e,[{key:"view",value:function(){var e=this.data.map(function(e){return'<a href="#" class="radio-item">\n                        <div class="img">\n                            <img data-src='+e.picUrl+' src="img/defaultpic.jpg" class="lazyload">\n                            <span class="icon"></span>\n                        </div>\n                        <span class="title">'+e.Ftitle+"</span>\n                    </a>"}).join("");this.$el.innerHTML='<h2>电台</h2>\n                  <div class="radios"></div>',this.$el.querySelector(".radios").innerHTML=e}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.HotSong=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e),this.$el=t.el,this.data=t.data,this.view()}return s(e,[{key:"view",value:function(){var e=this,t=this.data.map(function(t){return'<li class="hotSong-item">\n                        <div class="img">\n                            <img data-src="'+t.picUrl+'" src="img/defaultspic.jpg" class="lazyload">\n                            <div>\n                                <span class="listen-icon"></span>\n                                <span class="num">'+e.number(t.accessnum)+'万</span>\n                            </div>\n                            <span class="icon"></span>\n                        </div>\n                        <div class="text">\n                            <span class="title">'+t.songListDesc+'</span>\n                            <span class="author">'+t.songListAuthor+"</span>\n                        </div>              \n                    </li>"}).join("");this.$el.innerHTML='<h2>热门歌单</h2>\n                  <ul class="hotSongs"></ul>',document.querySelector(".hotSongs").innerHTML=t}},{key:"number",value:function(e){return Math.round(e/1e3)/10}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.List=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=n(0);t.List=function(){function e(t){i(this,e),this.$el=t,this.load()}return s(e,[{key:"load",value:function(){fetch("https://music-mlzctytemu.now.sh/list").then(function(e){return e.json()}).then(function(e){return e.data.topList}).then(this.view.bind(this))}},{key:"onloading",value:function(e){document.querySelector(".list-loading").style.display=e}},{key:"view",value:function(e){var t=this;this.onloading("none");var n=e,i=n.map(function(e){return'<li class="list-item">\n                        <div class="img">\n                            <img data-src='+e.picUrl+' src="img/defaultpic.jpg" class="lazyload">\n                            <div>\n                                <span class="listen-icon"></span>\n                                <span class="num">'+t.number(e.listenCount)+'万</span>\n                            </div>\n                    \n                        </div>\n                        <div class="text-content">\n                            <div class="text">\n                                <h3>'+e.topTitle+'</h3>\n                                <p>\n                                    <span>1</span>\n                                    <span class="songName">'+e.songList[0].songname+"</span>\n                                    <span>-"+e.songList[0].singername+'</span>\n                                </p>\n                                <p>\n                                    <span>2</span>\n                                    <span class="songName">'+e.songList[1].songname+"</span>\n                                    <span>-"+e.songList[1].singername+'</span>\n                                </p>\n                                <p>\n                                    <span>3</span>\n                                    <span class="songName">'+e.songList[2].songname+"</span>\n                                    <span>-"+e.songList[2].singername+'</span>\n                                </p>\n                            </div>\n                            <span class="arrow"></span>\n                        </div>\n                    </li>'}).join("");this.$el.innerHTML=i,(0,a.lazyload)()}},{key:"number",value:function(e){return(Math.round(e/1e3)/10).toFixed(1)}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.Search=function(){function e(t){i(this,e),this.$el=t,this.$input=this.$el.querySelector("input"),this.$cancle=this.$el.querySelector(".cancle"),this.$delet=this.$el.querySelector(".delet"),this.$searchSongs=this.$el.querySelector(".search-songs"),this.$onloading=this.$el.querySelector(".onloading"),this.$ending=this.$el.querySelector(".ending"),this.$input.addEventListener("keyup",this.keyUp.bind(this)),this.$input.addEventListener("focus",this.focus),this.$cancle.addEventListener("click",this.cancleClick.bind(this)),this.$delet.addEventListener("click",this.deletClick.bind(this)),document.addEventListener("scroll",this.onScroll.bind(this)),this.fetch=!0,this.goFetch=!1,this.curnum,this.page=1,this.list,this.value}return s(e,[{key:"keyUp",value:function(e){e.target.value.length&&(this.$delet.style.display="block"),13==e.keyCode&&(this.value||(this.value=this.$input.value.trim()),this.value!=this.$input.value&&this.rest(),this.onSearching())}},{key:"focus",value:function(){document.querySelector(".cancle").style.display="block"}},{key:"cancleClick",value:function(e){event.target;this.$input.value="",this.$delet.style.display="none",this.$cancle.style.display="none",this.$searchSongs.innerHTML=""}},{key:"deletClick",value:function(e){e.target;this.$input.value="",this.$searchSongs.innerHTML=""}},{key:"onSearching",value:function(){this.onloading(),fetch("https://music-mlzctytemu.now.sh/search?keyword="+this.value+"&page="+this.page).then(function(e){return e.json()}).then(function(e){return e.data}).then(this.view.bind(this)).then(this.ending.bind(this))}},{key:"rest",value:function(){this.page=1,this.$searchSongs.innerHTML="",this.value=this.$input.value.trim()}},{key:"view",value:function(e){var t=e.zhida,n=e.song.list;if(this.curnum=e.song.curnum,!document.querySelector(".singerContent")){var i='<li class="singerContent">\n            <div class="singerImg">\n                <img src="https://y.gtimg.cn/music/photo_new/T001R68x68M0000025NhlN2yWrP4.jpg?max_age=2592000">\n            </div>\n            <div class="singer">\n                <p class="name">'+t.singername+'</p>\n                <p class="num">\n                    <span class="songsNumber">单曲:'+t.albumnum+'</span>\n                    <span class="ablumNumber">专辑:'+t.songnum+"</span>\n                </p>\n            </div>\n          </li>";this.$searchSongs.innerHTML=i}var s=n.map(function(e){return'<li class="songs-item" data-content="interval='+e.interval+"&img="+e.albummid+"&song="+e.songid+"&lyc="+e.songid+'">\n                            <div class="musicLogo">\n                                <span></span>\n                            </div>\n                            <div class="song">\n                                <p class="songName">'+e.songname+'</p>\n                                <p class="singer">'+e.singer.map(function(e){return e.name+" "}).join("/")+"</p>\n                            </div>\n                        </li>"}).join("");this.$searchSongs.innerHTML+=s,this.goFetch=!1}},{key:"onScroll",value:function(){pageYOffset+document.documentElement.clientHeight>document.body.scrollHeight-10&&this.fetch&&!this.goFetch&&(this.goFetch=!0,this.page+=1,console.log(this.page),this.$searchSongs.length>0&&this.onSearching(),this.curnum<20&&(this.fetch=!1))}},{key:"onloading",value:function(){document.querySelector(".onloading").style.display="block",this.Fetch=!1}},{key:"ending",value:function(){this.curnum<20?(document.querySelector(".onloading").style.display="none",document.querySelector(".ending").style.display="block"):document.querySelector(".onloading").style.display="none"}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.Control=function(){function e(t){i(this,e),this.$el=t,this.$audio,this.pre=0,this.looptime=0,this.text,this.interval,this.img,this.song,this.lyc,this.name,this.singer,this.data,this.settime,this.$lycText,this.$playRadio=this.$el.querySelector(".playRadio"),this.$ablumHead=this.$el.querySelector(".ablumHead"),this.$img=this.$ablumHead.querySelector("img"),this.$songName=this.$ablumHead.querySelector(".songName"),this.$singer=this.$ablumHead.querySelector(".singer"),this.$control=this.$el.querySelector(".control"),this.$btns=this.$el.querySelector(".btns"),this.$ablumHead.addEventListener("click",this.button.bind(this)),document.querySelector(".station").addEventListener("click",this.on.bind(this)),document.querySelector(".playStation").addEventListener("click",this.down.bind(this)),document.querySelector(".search-songs").addEventListener("click",this.loadSong.bind(this))}return s(e,[{key:"down",value:function(){this.$el.style.transform="translateY(0)",document.querySelector(".search-songs").style.display="none"}},{key:"on",value:function(){this.$el.style.transform="translateY(-200%)",document.querySelector(".search-songs").style.display="flex"}},{key:"button",value:function(e){var t=e.target;t.matches(".playButton")?(t.className="pauseButton",this.playtime(),this.$audio.play()):t.matches(".pauseButton")&&(t.className="playButton",this.pausetime(),this.$audio.pause())}},{key:"loadSong",value:function(e){this.rect();var t=e.target;if(t.matches(".songs-item"))this.text=t.dataset.content,this.name=t.querySelector(".songName").innerHTML,this.singer=t.querySelector(".singer").innerHTML;else if(t.matches(".songName")||t.matches(".singer")){var n=t.parentNode.parentNode;this.name=n.querySelector(".songName").innerHTML,this.singer=n.querySelector(".singer").innerHTML,this.text=n.dataset.content}var i=[Number(this.getSomeOne("interval")[1]),this.getSomeOne("img")[1],this.getSomeOne("song")[1],this.getSomeOne("lyc")[1]];this.interval=i[0],this.img=i[1],this.song=i[2],this.lyc=i[3],this.$el.style.transform="translateY(0)",this.fetch(),document.querySelector(".search-songs").style.display="none"}},{key:"fetch",value:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){this.text&&fetch("https://music-mlzctytemu.now.sh/lyc?id="+this.lyc).then(function(e){return e.json()}).then(function(e){return e.lyric}).then(this.view.bind(this))})},{key:"radio",value:function(){this.$audio||(this.$audio=document.createElement("audio")),this.$el.appendChild(this.$audio),this.$audio.src="http://ws.stream.qqmusic.qq.com/"+this.song+".m4a?fromtag=46",this.$audio.loop="loop"}},{key:"getSomeOne",value:function(e){return"interval"==e?this.text.match(/interval=(\d{1,3})/):"img"==e?this.text.match(/img=(\w{1,})/):"song"==e?this.text.match(/song=(\w+)/):"lyc"==e?this.text.match(/lyc=(\d{1,})/):void console.log(this.text)}},{key:"getLyc",value:function(e){var t=document.createElement("div");t.innerHTML=e,this.data=t.innerText.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm)}},{key:"Head",value:function(){var e='<div>\n                            <img src="https://y.gtimg.cn/music/photo_new/T002R150x150M000'+this.img+'.jpg?max_age=2592000">\n                            <div class="song">\n                                <p class="songName">'+this.name+'</p>\n                                <p class="singer">'+this.singer+'</p>\n                            </div>\n                        </div>\n                        <span class="playButton"></span>';this.$ablumHead.innerHTML=e,document.querySelector(".background").style="background-image:url(https://y.gtimg.cn/music/photo_new/T002R150x150M000"+this.img+".jpg?max_age=2592000)"}},{key:"timer",value:function(e){var t=void 0,n=void 0;return t=e%60,n=(e-t)/60,n<10&&(n="0"+n),t<10&&(t="0"+t),n+":"+t}},{key:"change",value:function(e){var t=e.replace(/^\[(\d{2}):(\d{2}).(\d{2})\](.+)$/,"$1,$2,$3"),n=t.split(",");return Number(60*n[0])+Number(Number(n[1])+"."+Number(n[2]))}},{key:"movetime",value:function(e){this.$control.querySelector(".startTime").innerHTML=this.timer(e)}},{key:"movelyc",value:function(e){var t=this.$lycText.querySelectorAll(".lyc-item"),n=t.length;if(e<this.interval)for(var i=this.looptime;i<n;i++){var s=Number(t[i].dataset.sec);e>=s&&(this.$lycText.style.transform="translateY(-"+42*this.looptime+"px)",this.looptime<=n-1&&(t[i].style.color="#31c27c"),0!=this.looptime&&this.looptime<n-1&&(t[i-1].style.color="rgba(255,255,255,.6)"),this.looptime=i)}}},{key:"playtime",value:function(){var e=this;this.settime=setInterval(function(){e.pre+=1;var t=50*e.pre/1e3;e.movelyc(t);var n=parseInt(t);e.progess(n),e.movetime(n),n==e.interval&&e.fetch()},50)}},{key:"pausetime",value:function(){clearInterval(this.settime)}},{key:"control",value:function(){this.$control.querySelector(".endTime").innerHTML=this.timer(this.interval)}},{key:"ly",value:function(){var e=this;document.querySelector(".lyc").innerHTML='<div class="lycText"></div>';var t=this.data.map(function(t){return'<p class="lyc-item" data-sec="'+e.change(t)+'">'+t.slice(10)+"</p>"}).join("");this.$lycText=document.querySelector(".lycText"),this.$lycText.innerHTML=t}},{key:"rect",value:function(){this.pre=0,this.looptime=0,this.$audio&&this.$audio.pause(),this.pausetime(),this.$control.querySelector(".startTime").innerHTML="00:00",this.progess(this.pre)}},{key:"progess",value:function(e){var t=document.querySelector(".progressbar"),n=e/this.interval*100+"%";t.style.transform="translateX("+n+")"}},{key:"view",value:function(e){this.Head(),this.getLyc(e),this.ly(),this.control(this.interval),this.radio()}}]),e}()}]);