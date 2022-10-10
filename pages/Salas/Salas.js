var cardProps = [{
    name:"GTi - Grupo de trabalho do Israel",
    subtitle : "Empresa Jr.",
    imgSufix: "ft-fachada-deti.jpg"
},
{
    name:"CDC - Casa do caralho",
    subtitle : "Motivo de ódio",
    imgSufix: "ft-fachada-deti.jpg"
},
{
    name:"GTi - Grupo de trabalho do Israel",
    subtitle : "Empresa Jr.",
    imgSufix: "ft-fachada-deti.jpg"
},
{
    name:"CDC - Casa do caralho",
    subtitle : "Motivo de ódio",
    imgSufix: "ft-fachada-deti.jpg"
},]
var cardProp = {
    name:"Deti - departamento de teleinformatica",
    subtitle : 725,
    imgSufix: "ft-fachada-deti.jpg"
}
window.onload = function () {
    cardsContainer = document.getElementById("cards-container")
    for(var i = 0; i<cardProps.length; i++){
        cardProp = cardProps[i]
        departametoCard = document.createElement("custom-card2");
        departametoCard.setAttribute("name",cardProp.name)
        departametoCard.setAttribute("subname",cardProp.subtitle)
        departametoCard.setAttribute("redirect",cardProp.number)
        cardsContainer.appendChild(departametoCard)
    }
}