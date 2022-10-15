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
          <div class="nav">
            <div>
            </div>
            <div class="iconName">
              <img src="${imgPrefix}icons/logo.svg">
              <div class="nav-text">Sistema</div>
            </div>
            <button onclick="lightDarkMode()"><img id="modeImg" src="${imgPrefix}icons/darkMode.svg"></button>
          </div>
        </nav>
      `
    }
}
customElements.define('nav-bar', Navbar);

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
