export function lazyload() {
    let onscroll =throttle(function() {
        let imgs = document.querySelectorAll('img');
        let i = Array.prototype.filter.call(imgs,(ele)=>{
            return ele.className == "lazyload";
        })
        i.forEach((element) => {
            if(count(element)){
                element.src = element.dataset.src;
                element.className = '';
            }  
        });
    },500);
    window.addEventListener('scroll',onscroll);
    window.dispatchEvent(new Event('scroll'));
}



function count(el) {
    let {left,top,right,bottom} = el.getBoundingClientRect();
    let vpWidth = document.documentElement.clientWidth;
    let vpHeight = document.documentElement.clientHeight;
    return (
        (left>0 && left<vpWidth || right>0 && right<vpWidth) && (top>0 && top<vpHeight || bottom>0 && bottom<vpHeight)
    );
}
function throttle(fun,wait){
    let prv,timer;
    return function fn(){
        let now = + new Date();
        let diff = now - prv;
        if(!prv || diff >= wait) {
            prv = now;
            fun();
        }
        else if(diff<wait){
            clearTimeout(timer);
            timer = setTimeout(fn,wait-diff);
        }
    }
}