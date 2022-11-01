window.onload = function () {
    createButtonSalas()
    generateTableWithInfos()
    const calendarBody = document.getElementById("calendarBody")
    calendarBody.style.display = "none"
}
function createButtonSalas(){
    let sidebar = document.getElementsByClassName("sidebarName").item(0)

    let path = window.location.pathname
    let pathSplit = []
    pathSplit = path.split("/")
 

    let updateDepartament = document.createElement("custom-button")
    updateDepartament.setAttribute("redirect",`AtualizarBloco/${pathSplit[(pathSplit.length-2)]}`)
    updateDepartament.setAttribute("labelName","Atualizar departamento")
    updateDepartament.classList.add("color-white")

    let removeDepartemet = document.createElement("custom-button")
    removeDepartemet.setAttribute("redirect",`RemoverBloco/${pathSplit[(pathSplit.length-2)]}`)
    removeDepartemet.setAttribute("labelName","Remover departamento")
    removeDepartemet.classList.add("color-red")

    sidebar.appendChild(updateDepartament)
    sidebar.appendChild(removeDepartemet)
}