const imgPrefix = "../../imgs/"

var sidebarName = ""
if(window.location.pathname.endsWith("/Departamentos.html")){
  sidebarName = "Home"
}

const admin ={
  name:"admin",

}

class Sidebar extends HTMLElement {
    constructor() {
        super();
      }
    connectedCallback() {
        this.innerHTML = ` 
        <div class="sidebar">
          <div>
            <div class="userInfos">
              <img src="${imgPrefix}ft-707-interior.jpg" alt="user-image">
              <label>Bem vindo, ${admin.name}</label>
            </div>
              <div class="sidebarName">${sidebarName}</div>
          </div>
          <custom-button redirect="asdasd" labelName="Lista de usuários"></custom-button>
        </div>
      `
    }
}
customElements.define('side-bar', Sidebar);