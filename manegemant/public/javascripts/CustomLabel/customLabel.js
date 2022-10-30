var PCinfos
const defaultColor={
    "quebrado":"red",
    "funcionando":"green"
  }

function showColapse(button,id,labelType){
    button.classList.toggle('arrowInvert')
    clicou = true
    var content = document.getElementsByClassName("buttonDiv")[id-1]

    if(labelType == "user"){
        if(content.classList.contains("collapsed")){
            content.innerHTML = ""
        }else{
            content.innerHTML = `<hr style="width: 98%; background-color: black;">
            <div class="buttonsDiv">
                <custom-button labelName="Atualizar" redirect="updateUser/${id}">
                </custom-button>
                <custom-button class="color-red" labelName="Remover">
                </custom-button>
            </div>`
        }
        content.classList.toggle("collapsed")
    }
    else if(labelType == "computer"){
        if(content.classList.contains("collapsed")){
            content.innerHTML = ""
        }else{
            content.innerHTML = `<div class="colapsed">
            <hr style="width: 98%; background-color: black; margin: 0">
            <div class="colapInfos">
                <div>
                    <p>Processador</p>
                    <p>${PCinfos.CPU}</p>
                </div>
                <div>
                    <p>Placa de vídeo</p>
                    <p>${PCinfos.GPU}</p>
                </div>
                <div>
                    <p>Memória</p>
                    <p>${PCinfos.memory}</p>
                </div>
                <div>
                    <p>Sistema Operacional</p>
                    <p>${PCinfos.SO}</p>
                </div>
            </div>
            <hr style="width: 98%; background-color: black; margin: 0">
            <div class="colapButtons">                
                <custom-button class="color-white" labelName="Atualizar Computador"></custom-button>
                <custom-button class="color-red" labelName="Excluir Computador"></custom-button>
            </div>
        </div>`
        }
        content.classList.toggle("collapsed")
    }
    
}
class CustomLabelComputer extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback() {
        const imgPrefix = "images/"
        PCinfos = {
            status: this.hasAttribute("status")? this.getAttribute("status"): "funcionando",
            model: this.hasAttribute("model")? this.getAttribute("model"): "-",
            patrimonyTag: this.hasAttribute("patrimonyTag")? this.getAttribute("patrimonyTag"): "-",
            CPU: this.hasAttribute("cpu")? this.getAttribute("cpu"): "-",
            GPU: this.hasAttribute("gpu")? this.getAttribute("gpu"): "-",
            memory: this.hasAttribute("memory")? this.getAttribute("memory"): "-",
            SO: this.hasAttribute("so")? this.getAttribute("so"): "-"
        }
        if(!(PCinfos.status in defaultColor)){
            PCinfos.status = 'quebrado'
        }
        let id = this.hasAttribute("id")? this.getAttribute("id"): ""
        this.innerHTML=`
            <div class="mainContainer">
                <div class="handler">
                    <div class="status">
                        <div class="circle ${defaultColor[PCinfos.status]}"></div>
                        <p>${PCinfos.status}</p>
                    </div>
                    <p>${PCinfos.model}</p>
                    <p>${PCinfos.patrimonyTag}</p>
                    <div class="botao">
                        <button onclick="showColapse(this,${id},'computer')" id="${id}"><img src="images/icons/ArrowDown.svg" id="arrow" class="arrow"></button>
                    </div>
                </div>
                <div class="buttonDiv" id="${id}"></div>
            </div>

        `
    }
}

customElements.define("custom-label-computer", CustomLabelComputer)