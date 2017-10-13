import { lazyload } from './lazyload.js'
export class List{
    constructor(el){
        this.$el = el;
        this.load();
    }
    load(){
        // fetch('http://localhost:4000/list')
        fetch(`https://music-mlzctytemu.now.sh/list`)
        .then(res => res.json())
        .then(lis => lis.data.topList)
        .then( this.view.bind(this) )
    }
    view(el){
        let data = el;
        let html = data.map(ex => {
            return `<li class="list-item">
                        <div class="img">
                            <img data-src=${ex.picUrl} src="img/defaultpic.jpg" class="lazyload">
                            <div>
                                <span class="listen-icon"></span>
                                <span class="num">${this.number(ex.listenCount)+"万"}</span>
                            </div>
                    
                        </div>
                        <div class="text-content">
                            <div class="text">
                                <h3>${ex.topTitle}</h3>
                                <p>
                                    <span>1</span>
                                    <span class="songName">${ex.songList[0].songname}</span>
                                    <span>-${ex.songList[0].singername}</span>
                                </p>
                                <p>
                                    <span>2</span>
                                    <span class="songName">${ex.songList[1].songname}</span>
                                    <span>-${ex.songList[1].singername}</span>
                                </p>
                                <p>
                                    <span>3</span>
                                    <span class="songName">${ex.songList[2].songname}</span>
                                    <span>-${ex.songList[2].singername}</span>
                                </p>
                            </div>
                            <span class="arrow"></span>
                        </div>
                    </li>`
        }).join("");
        this.$el.innerHTML = html;
        lazyload();
    }
    number(el) {
        return (Math.round(el/1000)/10).toFixed(1);
    }
}
