window.onload = async function () {
    let buttons = document.querySelectorAll(`.buttonDiv`)
    buttons.forEach(content=> content.style.display = 'none')
    changeMode()

    let token = sessionStorage.getItem("token")
    if(!token)
        window.location.href = "/login"
    else{
        let permissions = await validateToken(token)
        if(permissions == "Aluno")
            window.location.href = "/"
        createButtonSalas(permissions)
    }
    setFontStorage()
    callFilterItem("usuarios")
    checkSideBarImg()
}

function createButtonSalas(permissions){
    if(permissions == "Administrador"){

        let sidebar = document.getElementsByClassName("sidebarName").item(0)

        let addUser = document.createElement("custom-button")
        addUser.setAttribute("redirect","NovoUsuario")
        addUser.setAttribute("labelName","+ Adicionar")
        addUser.classList.add("color-white")

        sidebar.appendChild(addUser)
    }
}
async function removeUser(userId){
    await fetch("http://localhost:3000/deleteUser/"+userId, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
    }).then(response => window.location.reload())

}