import { Radio } from './radio.js'
import { HotSong } from './hotsong.js'
import { lazyload } from './lazyload.js'
export class Slides {
    constructor(el){
        this.$el = el;
        this.$slidesA = this.$el.querySelector('.slides-A');
        this.$slidesB = this.$el.querySelector('.slides-B');
        this.width = document.querySelector('.app').clientWidth;
        this.$recommendContent = document.querySelector('.recommendContent');
        this.n = 0;
        this.m = 0;
        this.time = 0;
        this.loading();
    }
    loading(){
        // fetch('http://localhost:3001/')
        fetch(`http://www.codeyhj.cn:3001/`)
        // fetch(`https://music-mlzctytemu.now.sh`)
        .then(res => res.json())
        .then(rec => rec.data)
        .then( this.view.bind(this) )
    }
    onloading(el){
        document.querySelector('.recommendloading').style.display = el;
    }
    view(el) {
        this.onloading('none');
        let data = el;
        let html = data.slider.map(ex=> {
            return `<a href=${ex.linkUrl}>
                        <img src=${ex.picUrl}>
                    </a>`
        }).join("");
        let htmlDot = `<span></span>
                       <span></span>
                       <span></span>
                       <span></span>
                       <span></span>`
        this.$slidesA.innerHTML = html;
        this.$slidesB.innerHTML = html;
        this.imgWidth();
        this.loopTime();
        let radio = new Radio({el:document.querySelector('.radio'), data:data.radioList});
        let hotSong = new HotSong({el:document.querySelector('.hotSong'), data:data.songList});
        lazyload(this.$recommendContent);
    }

    imgWidth() {
        let img = this.$el.querySelectorAll('img');
        let length = img.length;
        for(let i=0;i<length;i++){
            img[i].style.width = `${this.width}px`;
        }
    }

    slidesALoop(){
        this.$slidesA.style.transform = `translateX(-${this.n*this.width}px)`;
    }

    slidesBLoop(){
        this.$slidesB.style.transform = `translateX(-${this.m*this.width}px)`;
    }

    check() {
        if(this.n==5) {
            this.$slidesB.style.transform = 'translateX(0px)';
            this.$slidesB.style.display = 'flex';
            this.$slidesA.style.display = 'none';
            this.$slidesA.style.transform = 'translateX(0)'; 
            this.m = 0;
        };
        if(this.m==5) {
            this.$slidesA.style.transform = 'translateX(0px)';
            this.$slidesA.style.display = 'flex';
            this.$slidesB.style.display = 'none';
            this.$slidesB.style.transform = 'translateX(0)';
            this.n=0;
            this.time=0;
        }
    }

    onlyTime() {
        if(this.n>=5){
            this.slidesBLoop();     
        };
        if(this.m>=5){
            this.slidesALoop();
        }
    }

    ex() {
        if(this.time<=5 && this.n<=5) {
            this.slidesALoop();
            this.$slidesB.style.transform = `translateX(${this.width}px)`;
        }
        this.check();
        this.onlyTime();
        this.m+=1;
        this.n+=1;
        this.time+=1;
        setTimeout(this.ex.bind(this),2000);
    }
    loopTime() {
        setTimeout(this.ex.bind(this),1000)
    }
}



