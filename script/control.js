export class Control{
    constructor(el){
        this.$el = el;
        this.$audio,
        this.pre = 0;
        this.looptime=0;
        this.text;
        this.interval;
        this.img;
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
    down(){
        this.$el.style.transform = 'translateY(0)';
        document.querySelector('.search-songs').style.display = "none";
    }
    on(){
        this.$el.style.transform = 'translateY(-200%)';
        document.querySelector('.search-songs').style.display = "flex";
    }
    button(event){
        let target = event.target;
        if(target.matches('.playButton')) {
            target.className = 'pauseButton';
            this.playtime();
            this.$audio.play();
        }
        else if(target.matches('.pauseButton')) {
            target.className = 'playButton';
            this.pausetime();
            this.$audio.pause();
        }
    }
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

        [this.interval,this.img,this.song,this.lyc] = [Number(this.getSomeOne("interval")[1]),this.getSomeOne("img")[1],this.getSomeOne("song")[1],this.getSomeOne("lyc")[1]];

        this.$el.style.transform = 'translateY(0)';
        this.fetch();
        document.querySelector('.search-songs').style.display = "none";
    }
    fetch(){
        if(this.text){
            // fetch(`http://localhost:4000/lyc?id=${this.lyc}`)
            fetch(`https://music-mlzctytemu.now.sh/lyc?id=${this.lyc}`)
            .then(res => res.json())
            .then(data => data.lyric)
            .then(this.view.bind(this))
        }
    }
    radio(){
        if(!this.$audio) this.$audio = document.createElement('audio');
        this.$el.appendChild(this.$audio);
        this.$audio.src = `http://ws.stream.qqmusic.qq.com/C400${this.song}.m4a?fromtag=38&vkey=5A2A8FCA5201ACFF896A3B5BD895B30A8F60042B4F23BE8F796FC87AB9D7C46D12E0C856971C23A715A16BF5F55049E22B140C2D1516A48B&guid=9029463304`;
        this.$audio.loop = 'loop';
    }

    getSomeOne(el){
        if(el == "interval") return this.text.match(/interval=(\d{1,3})/);
        if(el == "img") return this.text.match(/img=(\w{1,})/);
        if(el == "song") return this.text.match(/song=(\w+)/);
        if(el == "lyc") return this.text.match(/lyc=(\d{1,})/);
    }
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
        document.querySelector(".background").style= `background-image:url(https://y.gtimg.cn/music/photo_new/T002R150x150M000${this.img}.jpg?max_age=2592000)`;
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
    view(el){
        this.Head();
        this.getLyc(el);
        this.ly();
        this.control(this.interval);
        this.radio();
    }
}
