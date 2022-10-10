
class CustomLabel extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback() {
        var usersInfos = {
            name: this.hasAttribute("usersInfosName")? this.getAttribute("usersInfosName"): "",
            email: this.hasAttribute("usersInfosEmail")? this.getAttribute("usersInfosEmail"): "",
            role: this.hasAttribute("usersInfosRole")? this.getAttribute("usersInfosRole"): ""
        }
        this.innerHTML=`
        <div id="supergeneral">
            <div id="general">
                <div class="son">
                    <p>Nome</p>
                    <p>Email</p>
                    <p>Cargo</p>
                </div>
                <div class="son">
                    <p>${usersInfos.name}</p>
                    <p>${usersInfos.email}</p>
                    <p>${usersInfos.role}</p>
                </div>
            </div>
            <div class="botao">
                <button><img src="${imgPrefix}icons/ArrowDown.svg"></button>
            </div>
        </div>
        `
    }
}
customElements.define("custom-label", CustomLabel)