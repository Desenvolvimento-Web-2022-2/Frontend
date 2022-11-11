var texSize = 0

function changeMode() {
  let modeImg = document.getElementById("modeImg")
  if (!!localStorage.getItem("mode")) {
    let links = document.getElementsByTagName("link")
    for (let i = 0; i < links.length; i++) {
      let handleSplit = links[i].href.split(".css")
      if (localStorage.getItem("mode") == "light") {
        links[i].href = handleSplit[0].split("-dark")[0] +".css"
        modeImg.src = "../../imgs/icons/darkMode.svg"
      }
      else {
        if (links[i].href.endsWith(".css")) {
          links[i].href = handleSplit[0] + "-dark.css"
          modeImg.src = "../../imgs/icons/lightMode.svg"

        }
      }
    }
  }
}
class Navbar extends HTMLElement {
    constructor() {
        super();
      }
    connectedCallback() {
      const imgPrefix = "../../imgs/"
        this.innerHTML = ` 
        <nav>
            <div class="nav" >
                <div>
                </div>
                <div class="iconName">
                    <img src="${imgPrefix}icons/logo.svg" alt="logo">
                    <div class="nav-text">
                        Sistema
                    </div>
                </div>
                <button onclick="lightDarkMode()">
                    <img id="modeImg" src="${imgPrefix}icons/darkMode.svg" alt="lightDarkMode">
                </button>
                <button onclick="changeFontSize(1)">
                  <img id="modeImg" src="${imgPrefix}icons/plus.svg" alt="changeFontSize">
                </button>
                <button onclick="changeFontSize(-1)">
                  <img id="modeImg" src="${imgPrefix}icons/email.svg" alt="changeFontSize">
                </button>


            </div>
        </nav>
      `
    }
}
customElements.define('nav-bar', Navbar);

function setFontStorage(){
  console.log("ola!")
  if(localStorage.getItem("fontSize")){
    console.log(localStorage.getItem("fontSize"))
    tamanho = parseInt(localStorage.getItem("fontSize"))
    for(let i=0; i<tamanho; i++){
      changeFontSize(1)
    }
  }
}


function lightDarkMode(){
  if(!localStorage.getItem("mode")){
    localStorage.setItem("mode","dark")
  }
  else if(localStorage.getItem("mode") == "light"){
    localStorage.setItem("mode","dark")
  }
  else{
    localStorage.setItem("mode","light")
  }
  changeMode()
}


function setFontSize(text, index){
    for(let i = 0; i<text.length; i++){
        let fonSize = window.getComputedStyle(text[i]).fontSize
        fonSize = parseInt(fonSize)
        text[i].style.fontSize = `${fonSize+2*index}px`
    }    

}

function changeFontSize(index){
    let paragraph = document.getElementsByTagName("p")
    let a = document.getElementsByTagName("a")
    // Coloca um indice a na função e checa se a letra já foi aumentada 5x
    if(index == 1 && texSize < 6){
        texSize += index
        localStorage.setItem("fontSize", `${texSize}`)
        setFontSize(paragraph, 1)
        setFontSize(a, 1)
        //salva em h as tags de titulo de h1 a h6
        for(let i = 1; i<7; i++){
            let h = document.getElementsByTagName(`h${i}`)
            setFontSize(h, 1)
        }
    }
    // Coloca um indice a na função e checa se a letra já foi diminuida 5x
    if(index == -1 && texSize > 0){
        texSize += index
        localStorage.setItem("fontSize", `${texSize}`)
        setFontSize(paragraph, -1)
        setFontSize(a, -1)
        for(let i = 1; i<7; i++){
            let h = document.getElementsByTagName(`h${i}`)
            setFontSize(h, -1)
        }
    }
}


