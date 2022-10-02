const imgPathPrefix = new String("../../imgs/")
var cardProps = [{
    name:"GTEL - Grupo de Pesquisa em Telecomunicações Sem Fio",
    number : 722,
    imgSufix: "ft-fachada-deti.jpg"
},
{
    name:"LESC - Laboratório de Engenharia de Sistemas de Computação",
    number : 723,
    imgSufix: "ft-fachada-deti.jpg"
},
{
    name:"DETI - Departamento de Engenharia de Teleinformática",
    number  : 725,
    imgSufix: "ft-fachada-deti.jpg"
}]
var cardProp = {
    name:"Deti - departamento de teleinformatica",
    number : 725,
    imgSufix: "ft-fachada-deti.jpg"
}
window.onload = function () {
    cardsContainer = document.getElementById("cards-container")
    for(var i = 0; i<cardProps.length; i++){
        cardProp = cardProps[i]
        a = document.createElement("departameto-card");;
        cardsContainer.appendChild(a)
    }
}
class DepartametoCard extends HTMLElement {
    constructor() {
        super();
      }
    connectedCallback() {
        this.innerHTML = ` 
        <div class="depts">
        <div onclick='redirectToDep(${cardProp.number})'>
            <img src="${imgPathPrefix + cardProp.imgSufix}" alt="imagem do departamento" style="height: 75px;">
            <p>${cardProp.name}</p>
            <p>Bloco ${cardProp.number}</p>
        </div>
    </div>
      `
    }
}
customElements.define('departameto-card', DepartametoCard);

function redirectToDep(depNumber){
    
    window.location.href="/"+`${depNumber}`
} 