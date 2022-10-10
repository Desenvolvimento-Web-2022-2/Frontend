class Card extends HTMLElement {
    constructor() {
        super();
      }
    connectedCallback() {
        const imgPrefix = "../../imgs/"
        var route = this.hasAttribute("redirect")? this.getAttribute("redirect"): "/";
        var cardProp = {
            name:this.hasAttribute("name")? this.getAttribute("name"): "",
            subname : this.hasAttribute("subname")? this.getAttribute("subname"): "",
            imgSufix: "ft-fachada-deti.jpg",
            route: this.hasAttribute("redirect")? this.getAttribute("redirect"): "/"

        }
        this.innerHTML = ` 
        <div class="depts">
        <div onclick='redirectToDep("${route}")'>
            <img src="${imgPrefix + cardProp.imgSufix}" alt="imagem" style="height: 75px;">
            <p>${cardProp.name}</p>
            <p>${cardProp.subname}</p>
        </div>
    </div>
      `
    }
}
customElements.define('custom-card', Card);

function redirectToDep(route){
    window.location.href = "route"
} 