window.onload = function () {
    changeMode()
    setFontStorage()
    createButtonDept()
}

function createButtonDept(){
    let sidebar = document.getElementsByClassName("sidebarName").item(0)
    console.log("ta funcionando?")
    let createBloco = document.createElement("custom-button")
    createBloco.setAttribute("redirect",`CriarBloco`)
    createBloco.setAttribute("labelName","Criar Bloco")
    createBloco.classList.add("color-green")
    sidebar.appendChild(createBloco)
}