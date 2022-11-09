let permissions

window.onload = function () {
    let buttons = document.querySelectorAll(`.buttonDiv`)
    buttons.forEach(content=> content.style.display = 'none')
    changeMode()

    let token = sessionStorage.getItem("token")
    if(!token)
        window.location.href = "/login"
    else{
        permissions = validateToken(token)
        if(!permissions){
            sessionStorage.removeItem("token")
            window.location.href = "/login"
        }
        if(permissions == "Aluno")
            window.location.href = ""
        createButtonSalas()
    }
}

function createButtonSalas(){
    if(permissions == "Administrador"){

        var sidebar = document.getElementsByClassName("sidebarName").item(0)

        var addUser = document.createElement("custom-button")
        addUser.setAttribute("redirect","NovoUsuario")
        addUser.setAttribute("labelName","+ Adicionar")
        addUser.classList.add("color-white")

        sidebar.appendChild(addUser)
    }
}