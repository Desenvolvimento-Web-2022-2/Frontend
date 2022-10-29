window.onload = function () {
    createButtonSalas()
    generateTableWithInfos()
    // const calendarBody = document.getElementById("calendarBody")
    // calendarBody.style.display = "none"
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