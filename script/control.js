export class Control{
    constructor(el){
        // el为播放界面
        this.$el = el;
        this.$audio,
        this.pre = 0;
        this.looptime=0;
        this.text;
        this.interval;
        this.img;
        this.guid;
        this.vkey;
        this.song;
        this.lyc;
        this.name;
        this.singer;
        this.data;
        this.settime;
        this.$lycText;
        this.$playRadio = this.$el.querySelector('.playRadio');
        this.$ablumHead = this.$el.querySelector('.ablumHead');
        this.$img = this.$ablumHead.querySelector('img');
        this.$songName = this.$ablumHead.querySelector('.songName');
        this.$singer = this.$ablumHead.querySelector('.singer');
        this.$control = this.$el.querySelector('.control');
        this.$btns = this.$el.querySelector('.btns');
        this.$ablumHead.addEventListener('click',this.button.bind(this));
        document.querySelector('.station').addEventListener('click',this.on.bind(this));
        document.querySelector('.playStation').addEventListener('click',this.down.bind(this));
        document.querySelector('.search-songs').addEventListener('click',this.loadSong.bind(this));
    }
    // 按首页播放器按钮，播放界面滑落
    down(){
        this.$el.style.transform = 'translateY(0)';
        document.querySelector('.search-songs').style.display = "none";
    }
    // 播放器界面的音乐按钮，播放器隐藏
    on(){
        this.$el.style.transform = 'translateY(-200%)';
        document.querySelector('.search-songs').style.display = "flex";
    }
    button(event){
        let target = event.target;
        if(target.matches('.playButton')) {
            try{
            // target.className = 'pauseButton';
            target.classList.remove('playButton');
            target.classList.add('pauseButton');
            this.playtime();
            this.$audio.play();
            }catch(err){alert(err)}
        }
        else if(target.matches('.pauseButton')) {
            try{
            // target.className = 'playButton';
            target.classList.remove('pauseButton');
            target.classList.add('playButton');
            this.pausetime();
            this.$audio.pause();
            }catch(err){alert(err)}
        }
    }
    // 点击歌曲后首先运行,并处理相应数据
    loadSong(event){
        this.rect();
        let target = event.target;
        if(target.matches('.songs-item')) {
            this.text = target.dataset.content;
            this.name = target.querySelector('.songName').innerHTML;
            this.singer = target.querySelector('.singer').innerHTML;
        }
        else if(target.matches('.songName') || target.matches('.singer')){
            let node = target.parentNode.parentNode;
            this.name = node.querySelector('.songName').innerHTML;
            this.singer = node.querySelector('.singer').innerHTML;
            this.text = node.dataset.content;
        }
        // 用结构赋值去定义相关参数
        [this.interval,this.img,this.song,this.lyc] = [Number(this.getSomeOne("interval")[1]),this.getSomeOne("img")[1],this.getSomeOne("song")[1],this.getSomeOne("lyc")[1]];
        // 计算获得guid
        let t = new Date().getUTCMilliseconds();
        this.guid = (Math.round(2147483647 * Math.random()) * t) % 1e10;
        this.$el.style.transform = 'translateY(0)';
        this.fetch();
        document.querySelector('.search-songs').style.display = "none";
    }
    fetch(){
        if(this.text){
            // fetch(`http://localhost:4000/lyc?id=${this.lyc}`)
            // fetch(`https://music-mlzctytemu.now.sh/lyc?id=${this.lyc}`)
            // .then(res => res.json())
            // .then(data => {
            //     alert(5);
            //     let lyc = data.lyric;
            //     fetch(`http:///localhost:4000/song?songmid=${this.song}&filename=C400${this.song}.m4a&guid=${this.guid}`).then(res=>res.json())
            //     .then(data=>{
            //         alert(4);
            //         this.vkey = data.data.items[0].vkey;
            //         alert(3);
            //     })
            //     .then(()=>{alert(2);this.view({lyc,vkey:this.vkey})})
            // })           
            // .catch(error=>alert(error))
            console.log(this.song,this.guid,this.lyc)
            Promise.all([
                // fetch(`http://localhost:3001/lyc?id=${this.lyc}`),
                // fetch(`http://localhost:3001/song?songmid=${this.song}&filename=C400${this.song}.m4a&guid=${this.guid}`)
                fetch(`http://www.codeyhj.cn:3001/lyc?id=${this.lyc}`),
                fetch(`http://www.codeyhj.cn:3001/song?songmid=${this.song}&filename=C400${this.song}.m4a&guid=${this.guid}`)
            ])
            .then(res => Promise.all(res.map(response => response.json())))
            .then(jsons =>{
                console.log(jsons);
                let [ly,vkeyData] = jsons;
                let lyc = ly.lyric,
                    vkey = vkeyData.data.items[0].vkey;
                let obj = {lyc:lyc,vkey:vkey};
                return obj
            }).then(data => this.view(data));

            // fetch(`http://localhost:4000/song?songmid=${this.song}&filename=C400${this.song}.m4a&guid=${guid}`)
            // .then(res=>res.json())
            // .then(data => {console.log(data)})

        }
    }
    radio(x){
        if(!this.$audio) this.$audio = document.createElement('audio');
        this.$el.appendChild(this.$audio);
        this.$audio.src = `http://ws.stream.qqmusic.qq.com/C400${this.song}.m4a?fromtag=46&vkey=${x}&guid=${this.guid}`;
        // http://ws.stream.qqmusic.qq.com/${id}.m4a?fromtag=46
        // this.playtime();
    }

    getSomeOne(el){
        if(el == "interval") return this.text.match(/interval=(\d{1,3})/);
        if(el == "img") return this.text.match(/img=(\w{1,})/);
        if(el == "song") return this.text.match(/song=(\w+)/);
        if(el == "lyc") return this.text.match(/lyc=(\d{1,})/);
    }
    // 把第一次获得的歌词用正则转换成合适的规则排列
    getLyc(el){
        let div = document.createElement('div');
        div.innerHTML = el;
        this.data = div.innerText.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm);
    }
    Head(){
        let htmlHead = `<div>
                            <img src="https://y.gtimg.cn/music/photo_new/T002R150x150M000${this.img}.jpg?max_age=2592000">
                            <div class="song">
                                <p class="songName">${this.name}</p>
                                <p class="singer">${this.singer}</p>
                            </div>
                        </div>
                        <span class="playButton"></span>`;
        this.$ablumHead.innerHTML = htmlHead;
        let back = `background-image:url(https://y.gtimg.cn/music/photo_new/T002R150x150M000${this.img}.jpg?max_age=2592000)`

        // document.querySelector(".background").style= `background-image:url(https://y.gtimg.cn/music/photo_new/T002R150x150M000${this.img}.jpg?max_age=2592000)`;
        document.querySelector(".background").setAttribute('style',back);
    }
    timer(time){
       let sec,min;
       sec = time % 60;
       min = (time-sec)/60;
       if(min<10) min = "0"+min;
       if(sec<10) sec = "0"+sec;
       return min+":"+sec;
    }
    change(el){
       let text = el.replace(/^\[(\d{2}):(\d{2}).(\d{2})\](.+)$/,"$1,$2,$3");
       let arr = text.split(",");
       let sec = Number(arr[0]*60) + Number(Number(arr[1])+ "." + Number(arr[2]));
       return sec;
    }
    movetime(el){
        this.$control.querySelector('.startTime').innerHTML = this.timer(el);
    }
    movelyc(pre){
        let p = this.$lycText.querySelectorAll('.lyc-item');
        let len = p.length;
        if(pre<this.interval){
            for(let i=this.looptime; i<len;i++){
                let now = Number(p[i].dataset.sec);
                if(pre>=now){
                    this.$lycText.style.transform = `translateY(-${this.looptime*42}px)`;
                    if(this.looptime <= len-1) p[i].style.color = '#31c27c';
                    if(this.looptime !=0 && this.looptime < len-1) p[i-1].style.color = 'rgba(255,255,255,.6)';
                    this.looptime = i;
                }
            }
        }
    }
    playtime(){
        let ti;
        this.settime = setInterval(()=>{
            this.pre+=1;
            let time = this.pre*50/1000;
            this.movelyc(time);
            let starttime = parseInt(time);
            this.progess(starttime);
            this.movetime(starttime);
            if(starttime == this.interval) this.fetch();
        },50)
    }
    pausetime(){
        clearInterval( this.settime );
    }
    control(){
        this.$control.querySelector('.endTime').innerHTML = this.timer(this.interval);
    }
    // 在播放界面写入歌词报幕
    ly(){
        document.querySelector('.lyc').innerHTML = `<div class="lycText"></div>`
        let htmlLyc = this.data.map(lyc => {
            return `<p class="lyc-item" data-sec="${this.change(lyc)}">${lyc.slice(10)}</p>`
        }).join("");
        this.$lycText = document.querySelector('.lycText');
        this.$lycText.innerHTML = htmlLyc;
    }
    rect(){
        this.pre = 0;
        this.looptime=0;
        if(this.$audio)this.$audio.pause();
        this.pausetime();
        this.$control.querySelector('.startTime').innerHTML = '00:00';
        this.progess(this.pre);
    }
    progess(el){
        let pro = document.querySelector('.progressbar');
        let percent = el/this.interval*100+"%";
        pro.style.transform = `translateX(${percent})`;
    }
    view(obj){
        let lyc = obj.lyc,
        vkey =obj.vkey;
        // let {lyc,vkey} = obj;
        // 渲染头像
        this.Head();
        // 转换歌词格式
        this.getLyc(lyc);
        // 渲染歌词
        this.ly();
        // 渲染歌曲时间
        this.control();
        // 建立H5 radio标签，并播放
        this.radio(vkey);
    }
}
