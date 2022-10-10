const validAction = ['close','continue']
class CustomButton extends HTMLElement {
    constructor() {
      super();       
      }
    connectedCallback() {
        var route = this.hasAttribute("redirect")? this.getAttribute("redirect"): "/";
        var onclick = `'redirect("${route}")'`
        var labelName = this.hasAttribute("labelName")? this.getAttribute("labelName"): "";
        var action = this.hasAttribute("action")? this.getAttribute("action"): ""
        console.log(typeof action)
        if(validAction.includes(action)){
          onclick = `'handleAction("${action}")'`
        }
        this.innerHTML = ` 
          <div class="customButton" style="display:flex;justify-content: center;">
            <button onclick=${onclick}>${labelName}</button>
          </div>
      `
    }
  }
  customElements.define('custom-button',CustomButton)
  function redirect(route){
    window.location.href = "/"+route+"/"
  }
  function handleAction(action){
    var customModal = document.getElementsByTagName('custom-modal')[0]
    action == 'close' ? 
      localStorage.setItem("Prosseguir",false) :
      localStorage.setItem("Prosseguir",true)
      
    customModal.remove()
  }