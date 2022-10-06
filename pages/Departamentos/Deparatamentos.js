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
},{
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
        departametoCard = document.createElement("custom-card");
        departametoCard.setAttribute("name",cardProp.name)
        departametoCard.setAttribute("subname","Bloco"+cardProp.number)
        departametoCard.setAttribute("redirect",cardProp.number)
        cardsContainer.appendChild(departametoCard)
    }
}