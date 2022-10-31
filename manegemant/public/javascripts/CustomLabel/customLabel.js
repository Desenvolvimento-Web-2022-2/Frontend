var PCinfos
const defaultColor={
    "quebrado":"red",
    "funcionando":"green"
  }

function showColapse(id, labelType) {
    button = document.getElementById(`button${id}`)
    button.classList.toggle('arrowInvert')
    let content = document.getElementById(`computerOrUser${id}`)
    if (content.classList.contains("collapsed")) {
        content.style.display = 'none'
    } else {
        content.style.display = 'grid'
    }
    content.classList.toggle("collapsed")
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