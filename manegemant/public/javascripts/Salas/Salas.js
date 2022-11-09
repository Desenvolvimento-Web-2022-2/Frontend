window.onload = function () {
    changeMode()
    createButtonSalas()
    setFontStorage()
}
function createButtonSalas(){
    let sidebar = document.getElementsByClassName("sidebarName").item(0)

    pathSplit = getPath()
    console.log(pathSplit)

    let updateDepartament = document.createElement("custom-button")
    updateDepartament.setAttribute("redirect",`AtualizarBloco/${pathSplit[(pathSplit.length-2)]}`)
    updateDepartament.setAttribute("labelName","Atualizar departamento")
    updateDepartament.classList.add("color-white")

    let removeDepartement = document.createElement("custom-button")
    removeDepartement.setAttribute("redirect",`RemoverBloco/${pathSplit[(pathSplit.length-2)]}`)
    removeDepartement.setAttribute("labelName","Remover departamento")
    removeDepartement.classList.add("color-red")

    let createDepartement = document.createElement("custom-button")
    createDepartement.setAttribute("redirect",`bloco/${pathSplit[(pathSplit.length-2)]}/CriarSala/`)
    createDepartement.setAttribute("labelName","Criar Sala")
    createDepartement.classList.add("color-green")

    sidebar.appendChild(updateDepartament)
    sidebar.appendChild(removeDepartement)
    sidebar.appendChild(createDepartement)

}
function getPath(){
    let path = window.location.pathname
    return path.split("/")
}

