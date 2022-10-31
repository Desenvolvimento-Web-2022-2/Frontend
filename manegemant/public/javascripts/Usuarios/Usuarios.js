window.onload = function () {
    let buttons = document.querySelectorAll(`.buttonDiv`)
    buttons.forEach(content=> content.style.display = 'none')
    changeMode()
    createButtonSalas()
}

function createButtonSalas(){
    var sidebar = document.getElementsByClassName("sidebarName").item(0)

    var addUser = document.createElement("custom-button")
    addUser.setAttribute("redirect","newUser")
    addUser.setAttribute("labelName","+ Adicionar")
    addUser.classList.add("color-white")

    sidebar.appendChild(addUser)
}