const stripeColor={
  "attention":"yellow",
  "warning":"red",
  "sucess":"green"
}

const defaultTitle={
  "attention":"Atenção",
  "warning":"Erro",
  "sucess":"Sucesso"
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
        var title = this.hasAttribute("title") ? this.getAttribute("title"): defaultTitle[type];
        var bodyMessage={
          "attention":"-",
          "warning":"Tem certeza que deseja remover isto? essa ação não poderá ser desfeita",
          "sucess":"Operação realizada com sucesso"
        }
        
        var message = this.hasAttribute("message") ? this.getAttribute("message") : bodyMessage[type]
        
        var buttons = `<custom-button action ="close" class="color-white bordered" labelName ="fechar">
                       </custom-button>`

        buttons += type == "warning" ? "" : 
        `<custom-button action="continue" class="color-white bordered" labelName ="prosseguir">
         </custom-button>` 
        
        this.innerHTML = ` 
          <div class="modal-container">
            <div class="stripe ${stripeColor[type]}">
            </div>
            <div class="body-content body">
              <div class="body-title">
                <div class="body-title-img">
                  <img src="${imgPrefix}${type}-${stripeColor[type]}.svg" alt="simbol">
                  <h1>${title}</h1>
                </div>
                <div>
                  <p>${message}</p>
                </div>
                <div class="buttonsContainer">
                  ${buttons}
                </div>
              </div>
            </div>
          </div>
        `
    }
}
customElements.define('custom-modal',CustomModal)