class Navbar extends HTMLElement {
    constructor() {
        super();
      }
    connectedCallback() {
        this.innerHTML = ` 
        <nav>
          <div class="nav">
            <img src="../../imgs/icons/logo.svg">
            <div class="nav-text">Sistema</div>
          </div>
        </nav>
      `
    }
}
customElements.define('nav-bar', Navbar);