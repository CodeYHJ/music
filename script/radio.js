export class Radio {
    constructor(option = {}){
        this.$el = option.el;
        this.data = option.data;
        this.view();
    }
    view () {
        let htmlRadios = this.data.map(ex=> {
            return `<a href="#" class="radio-item">
                        <div class="img">
                            <img data-src=${ex.picUrl} src="img/defaultpic.jpg" class="lazyload">
                            <span class="icon"></span>
                        </div>
                        <span class="title">${ex.Ftitle}</span>
                    </a>`
        }).join("");
        let htmlH2 = `<h2>电台</h2>
                  <div class="radios"></div>`;
        this.$el.innerHTML = htmlH2;
        this.$el.querySelector(".radios").innerHTML = htmlRadios;
    }
}