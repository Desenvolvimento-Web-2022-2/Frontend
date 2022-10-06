
class CustomButton extends HTMLElement {
    constructor() {
      super();       
      }
    connectedCallback() {
        var route = this.hasAttribute("redirect")? this.getAttribute("redirect"): "/";
        var labelName = this.hasAttribute("labelName")? this.getAttribute("labelName"): "";
        this.innerHTML = ` 
          <div class="customButton" style="display:flex;justify-content: center;">
            <button onclick='redirect("${route}")'>${labelName}</button>
          </div>
      `
    }
  }
  customElements.define('custom-button',CustomButton)
  function redirect(route){
    window.location.href = "/"+route+"/"
  }