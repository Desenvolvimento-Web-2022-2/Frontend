class Card2 extends HTMLElement {
    constructor() {
        super();
      }
    connectedCallback() {
        var route = this.hasAttribute("redirect")? this.getAttribute("redirect"): "/";
        var cardProp = {
            name:this.hasAttribute("name")? this.getAttribute("name"): "",
            subname : this.hasAttribute("subname")? this.getAttribute("subname"): "",
            imgSufix: "ft-fachada-deti.jpg",
            route: this.hasAttribute("redirect")? this.getAttribute("redirect"): "/"
        }
        var cardNameAndSubname = ["",""]
        if(cardProp.name.includes(" - ")){
            cardNameAndSubname = cardProp.name.split("-")
        }
        else{
            cardNameAndSubname[0] = cardProp.name
            cardNameAndSubname[1] = "-"
        }
        this.innerHTML = ` 
        <div class="ext" onclick='redirectToDep("${route}")'>
            <img src="${imgPrefix + cardProp.imgSufix}" alt="imagem">
            <p>${cardNameAndSubname[0]}</p>
            <p class="tooltip" style="  white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;">${cardNameAndSubname[1]}<span class="tooltiptext">${cardNameAndSubname[1]}</span></p>
            <p>${cardProp.subname}</p>
        </div>
      `
    }
}
customElements.define('custom-card2', Card2);

function redirectToDep(depNumber){
    window.location.href = "/departamento/"+depNumber+"/"
} 