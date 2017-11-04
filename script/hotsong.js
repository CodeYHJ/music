export class HotSong {
    constructor(option={}){
        this.$el = option.el;
        this.data = option.data;
        this.view();
    }
    view() {
        let htmlH2 = `<h2>热门歌单</h2>
                  <ul class="hotSongs"></ul>`;

        let htmlHotSongs = this.data.map(ex=> {
            return `<li class="hotSong-item">
                       <a href="https://y.qq.com/w/taoge.html?ADTAG=myqq&from=myqq&channel=10007100&id=${ex.id}">
                            <div class="img">
                                <img data-src="${ex.picUrl}" src="img/defaultspic.jpg" class="lazyload">
                                <div>
                                    <span class="listen-icon"></span>
                                    <span class="num">${this.number(ex.accessnum)+ "万"}</span>
                                </div>
                                <span class="icon"></span>
                            </div>
                            <div class="text">
                                <span class="title">${ex.songListDesc}</span>
                                <span class="author">${ex.songListAuthor}</span>
                            </div>  
                        </a>            
                    </li>`
        }).join("");
        this.$el.innerHTML = htmlH2;
        document.querySelector('.hotSongs').innerHTML = htmlHotSongs;
    }
    number(el) {
        return Math.round(el/1000)/10;
    }
}