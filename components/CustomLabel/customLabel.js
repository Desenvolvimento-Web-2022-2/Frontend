class CustomLabelUser extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback() {
        const imgPrefix = "../../imgs/"
        var usersInfos = {
            name: this.hasAttribute("usersInfosName")? this.getAttribute("usersInfosName"): "a",
            email: this.hasAttribute("usersInfosEmail")? this.getAttribute("usersInfosEmail"): "b",
            role: this.hasAttribute("usersInfosRole")? this.getAttribute("usersInfosRole"): "c"
        }
        let id = this.hasAttribute("id")? this.getAttribute("id"): ""
        this.innerHTML=`
            <div class="mainContainer">
                <div style="display:grid;grid-template-columns:90% 10%;    align-items: center;">
                    <div class="itensDiv">
                        <p>Nome</p>
                        <p>Email</p>
                        <p>Cargo</p>
                        <p>${usersInfos.name}</p>
                        <p>${usersInfos.email}</p>
                        <p>${usersInfos.role}</p>
                    </div>
                    <div class="botao">
                        <button onclick="showColapse(this,${id},'user')" id="${id}"><img src="${imgPrefix}icons/ArrowDown.svg" id="arrow" class="arrow"></button>
                    </div>
                </div>
                <div class="buttonDiv" id="${id}">
                    
                </div>
                
            </div>
        `
    }
}

customElements.define("custom-label-user", CustomLabelUser)

function showColapse(button,id,labelType){
    button.classList.toggle('arrowInvert')
    var content = document.getElementsByClassName("buttonDiv")[id-1]
    if(labelType == "user"){
        if(content.classList.contains("collapsed")){
            content.innerHTML = ""
        }else{
            content.innerHTML = `<hr style="width: 98%; background-color: black;">
            <div class="buttonsDiv">
                <custom-button labelName="Atualizar">
                </custom-button>
                <custom-button class="color-red" labelName="Remover">
                </custom-button>
            </div>`
        }
        content.classList.toggle("collapsed")
    }
    else if(labelType == "Comp"){
        
    }
    
}
class CustomLabelComputer extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback() {
        const imgPrefix = "../../imgs/"
        var usersInfos = {
            name: this.hasAttribute("usersInfosName")? this.getAttribute("usersInfosName"): "a",
            email: this.hasAttribute("usersInfosEmail")? this.getAttribute("usersInfosEmail"): "b",
            role: this.hasAttribute("usersInfosRole")? this.getAttribute("usersInfosRole"): "c"
        }
        let id = this.hasAttribute("id")? this.getAttribute("id"): ""
        this.innerHTML=`
            <div class="mainContainer">
                <div style="display:grid;grid-template-columns:90% 10%;    align-items: center;">
                    <div class="itensDiv">
                        <p>Nome</p>
                        <p>Email</p>
                        <p>Cargo</p>
                        <p>${usersInfos.name}</p>
                        <p>${usersInfos.email}</p>
                        <p>${usersInfos.role}</p>
                    </div>
                    <div class="botao">
                        <button onclick="showColapse(this,${id},'computer')" id="${id}"><img src="${imgPrefix}icons/ArrowDown.svg" id="arrow" class="arrow"></button>
                    </div>
                </div>
                <div class="buttonDiv" id="${id}">
                    
                </div>
                
            </div>
        `
    }
}
customElements.define("custom-label-computer", CustomLabelComputer)