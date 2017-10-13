document.querySelector(".tab").addEventListener("click", function(event){  
    let $tab = document.querySelector(".tab");
    let target = event.target;
    let name = target.dataset.name;
    if(target.parentNode.className == "tab"){
        for(let i=0; i<$tab.children.length; i++) {
            $tab.children[i].classList.remove("main");
            let name = $tab.children[i].dataset.name;
            document.querySelector(`.${name}Content`).style.display = 'none';
        }
        target.classList.add("main");
        document.querySelector(`.${name}Content`).style.display = 'block';
        window.dispatchEvent(new Event('scroll'));
    }
    for(let i=0; i<$tab.children.length; i++) {
        if($tab.children[i].className.match(/main/g)){
            let name = $tab.children[i].dataset.name;
            document.querySelector(`.${name}Content`).style.display = 'block';
        }
    }
});