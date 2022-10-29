window.onload = function () {
    changeMode()
    createButtonSalas()
}

function createButtonSalas(){
    var sidebar = document.getElementsByClassName("sidebarName").item(0)

    var addUser = document.createElement("custom-button")
    addUser.setAttribute("redirect","pages/NovosUsuarios/NovoUsuario.html")
    addUser.setAttribute("labelName","+ Adicionar")
    addUser.classList.add("color-white")

    sidebar.appendChild(addUser)
}