const stripeColor={
    "attention":"yellow",
    "warning":"red",
    "sucess":"green"
}
class CustomModal extends HTMLElement {
    constructor() {
      super();       
      }

    connectedCallback() {
        const imgPrefix = "../../imgs/icons/"
        var type = this.hasAttribute("type") ? this.getAttribute("type"): "attention";
        if(!(type in stripeColor))
          type = "attention"
        var title = this.hasAttribute("title") ? this.getAttribute("title"): "Atenção";
        var bodyMessage={
          "attention":"-",
          "warning":"Tem certeza que deseja remover isto? essa ação não poderá ser desfeita",
          "sucess":"Operação realizada com sucesso"
        }
        var message = this.hasAttribute("message") ? this.getAttribute("message") : bodyMessage[type]
        this.innerHTML = ` 
        <div class="modal-container">
            <div class="stripe ${stripeColor[type]}">
            </div>
            <div class="body-content white">
                <div style="margin:50px ">
                    <div style="display:flex;align-items: center;">
                    <img src="${imgPrefix}${type}-${stripeColor[type]}.svg" style="width:36px;height:36px;margin-right:4px">
                    <h1>${title}</h1>
                </div>
                <div>
                  <p>${message}<p>
                </div>
                <div>
                <custom-button labelName ="fechar"></custom-button>
                </div>
            </div>
        </div>
      `
    }
  }
  customElements.define('custom-modal',CustomModal)