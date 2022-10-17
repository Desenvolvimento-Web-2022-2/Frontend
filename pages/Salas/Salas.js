var cardProps = [{
    name:"GTi - Grupo de trabalho do Israel",
    subtitle : "Empresa Jr.",
    imgSufix: "ft-fachada-deti.jpg"
},
{
    name:"CDH - Clube do hardware",
    subtitle : "Projeto de extensão",
    imgSufix: "ft-fachada-deti.jpg"
},
{
    name:"GTi - Grupo de trabalho do Israel",
    subtitle : "Empresa Jr.",
    imgSufix: "ft-fachada-deti.jpg"
},
{
    name:"CDH - Clube do hardware",
    subtitle : "Projeto de extensão",
    imgSufix: "ft-fachada-deti.jpg"
},]
var cardProp = {
    name:"Deti - departamento de teleinformatica",
    subtitle : 725,
    imgSufix: "ft-fachada-deti.jpg"
}
window.onload = function () {
    document.getElementsByClassName("sidebarName").item(0).innerHTML = "Deti"
    createCardsSalas()
    createButtonSalas()
}

function createCardsSalas(){
    changeMode()
    var cardsContainer = document.getElementById("cards-container")
    for(var i = 0; i<cardProps.length; i++){
        cardProp = cardProps[i]
        departametoCard = document.createElement("custom-card2");
        departametoCard.setAttribute("name",cardProp.name)
        departametoCard.setAttribute("subname",cardProp.subtitle)
        departametoCard.setAttribute("redirect",cardProp.number)
        cardsContainer.appendChild(departametoCard)
    }
}

function createButtonSalas(){
    var sidebar = document.getElementsByClassName("sidebarName").item(0)

    var updateDepartament = document.createElement("custom-button")
    updateDepartament.setAttribute("redirect","/")
    updateDepartament.setAttribute("labelName","Atualizar departamento")
    updateDepartament.classList.add("color-white")

    var removeDepartemet = document.createElement("custom-button")
    removeDepartemet.setAttribute("redirect","/")
    removeDepartemet.setAttribute("labelName","Remover departamento")
    removeDepartemet.classList.add("color-red")

    sidebar.appendChild(updateDepartament)
    sidebar.appendChild(removeDepartemet)
}