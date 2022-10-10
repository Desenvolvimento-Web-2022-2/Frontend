class Navbar extends HTMLElement {
    constructor() {
        super();
      }
    connectedCallback() {
      const imgPrefix = "../../imgs/"
        this.innerHTML = ` 
        <nav>
          <div class="nav">
            <img src="${imgPrefix}icons/logo.svg">
            <div class="nav-text">Sistema</div>
          </div>
        </nav>
      `
    }
}
customElements.define('nav-bar', Navbar);