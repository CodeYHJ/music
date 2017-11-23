export class Search{
    constructor(el){
        this.$el = el;
        this.$app = document.querySelector('.app');
        this.$input = this.$el.querySelector('input');
        this.$cancle = this.$el.querySelector('.cancle');
        this.$delet = this.$el.querySelector('.delet');
        this.$searchSongs = this.$el.querySelector('.search-songs');
        this.$onloading = this.$el.querySelector('.onloading');
        this.$ending = this.$el.querySelector('.ending');
        this.$input.addEventListener('keyup',this.keyUp.bind(this));
        this.$input.addEventListener('focus',this.focus);
        this.$cancle.addEventListener('click',this.cancleClick.bind(this));
        this.$delet.addEventListener('click',this.deletClick.bind(this));
        this.$el.addEventListener('scroll', this.onScroll.bind(this));
        this.fetch = true;
        this.goFetch = false;
        this.curnum;
        this.page = 1;
        this.list;
        this.value;
    }
    keyUp(event){
        let target = event.target;
        let value = target.value.length;
        if(value) this.$delet.style.display = "block";
        if(event.keyCode == 13) {
            if(!this.value)this.value = this.$input.value.trim();
            if(this.value != this.$input.value) this.rest();
            this.onSearching();
        }
    }
    focus(){
        document.querySelector('.cancle').style.display = 'block';
    }
    cancleClick(evnet){
        let target = event.target;
        this.$input.value = "";
        this.$delet.style.display = "none";
        this.$cancle.style.display = "none";
        this.$searchSongs.innerHTML = "";
        document.querySelector('.onloading').style.display = 'none';
        document.querySelector('.ending').style.display = 'none';
    }
    deletClick(event){
        let target = event.target;
        this.$input.value = "";
        this.$searchSongs.innerHTML = "";
        document.querySelector('.onloading').style.display = 'none';
        document.querySelector('.ending').style.display = 'none';
    }
    onSearching(){
        this.onloading();
        // fetch(`http://localhost:4000/search?keyword=${this.value}&page=${this.page}`)
        fetch(`https://music-mlzctytemu.now.sh/search?keyword=${this.value}&page=${this.page}`)
        .then(res => res.json())
        .then(sea => sea.data)
        .then(this.view.bind(this))
        .then(this.ending.bind(this))
    }
    rest(){
        this.page = 1;
        this.$searchSongs.innerHTML = '';
        this.value = this.$input.value.trim();

    }
    view(ex){
        let zhida = ex.zhida;
        let list = ex.song.list;
        this.curnum = ex.song.curnum;
        if(!document.querySelector('.singerContent')){
            let htmlSingerContent = `<li class="singerContent">
            <div class="singerImg">
                <img src="https://y.gtimg.cn/music/photo_new/T001R68x68M0000025NhlN2yWrP4.jpg?max_age=2592000">
            </div>
            <div class="singer">
                <p class="name">${zhida.singername}</p>
                <p class="num">
                    <span class="songsNumber">单曲:${zhida.albumnum}</span>
                    <span class="ablumNumber">专辑:${zhida.songnum}</span>
                </p>
            </div>
          </li>`;

          this.$searchSongs.innerHTML = htmlSingerContent;
        }

            let htmlSongs = list.map(el => {
                return `<li class="songs-item" data-content="interval=${el.interval}&img=${el.albummid}&song=${el.songid}&lyc=${el.songid}">
                            <div class="musicLogo">
                                <span></span>
                            </div>
                            <div class="song">
                                <p class="songName">${el.songname}</p>
                                <p class="singer">${el.singer.map(x => { return x.name + " " }).join("/")}</p>
                            </div>
                        </li>`
            }).join("");
            this.$searchSongs.innerHTML += htmlSongs;
            this.goFetch = false;
        
    } 
    onScroll(){
        console.log(this.$el.clientHeight)
        console.log(this.$el.scrollHeight)
        if(pageYOffset + this.$el.clientHeight < (this.$el.scrollHeight - 10) && this.fetch && !this.goFetch) {
                this.goFetch = true;
                this.page+=1;
                // console.log(this.page);
                // console.log(this.$searchSongs.children.length);
                if(this.$searchSongs.children.length>0)this.onSearching();
                if(this.page>=this.curnum) this.fetch = false;
        }

    }
    onloading(){
        document.querySelector('.onloading').style.display = 'block';
        // this.fetch = false;
    }
    ending(){
        if(this.page >= this.curnum){
            document.querySelector('.onloading').style.display = 'none';
            document.querySelector('.ending').style.display = 'block';
        }
        else{
            document.querySelector('.onloading').style.display = 'none';
        } 
    }
}