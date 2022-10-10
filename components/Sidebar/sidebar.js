const admin ={
  name:"admin",
}

class Sidebar extends HTMLElement {
    constructor() {
        super();
      }
    connectedCallback() {
      const imgPrefix = "../../imgs/"
      var sidebarName = this.hasAttribute("labelName")? this.getAttribute("labelName"): "Home"
        this.innerHTML = ` 
        <div class="sidebar">
          <div>
            <div class="userInfos">
              <img src="${imgPrefix}ft-707-interior.jpg" alt="user-image">
              <label>Bem vindo, ${admin.name}</label>
            </div>
              <div class="sidebarName">${sidebarName}</div>
          </div>
          <custom-button class="color-white" redirect="asdasd" labelName="Lista de usuários"></custom-button>
        </div>
      `
    }
}
customElements.define('side-bar', Sidebar);