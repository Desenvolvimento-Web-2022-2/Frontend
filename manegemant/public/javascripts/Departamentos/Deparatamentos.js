let permissions

window.onload = async function () {
    changeMode()
    let token = sessionStorage.getItem("token")
    if(!token)
        window.location.href = "/login"
    else{
        permissions = await validateToken(token)
    }
    setFontStorage()
    createButtonDept(permissions)
}

function createButtonDept(permissions){
    if(permissions == "Administrador"){
        let sidebar = document.getElementsByClassName("sidebarName").item(0)
        let createBloco = document.createElement("custom-button")
        createBloco.setAttribute("redirect",`CriarBloco`)
        createBloco.setAttribute("labelName","Criar Bloco")
        createBloco.classList.add("color-green")
        sidebar.appendChild(createBloco)
    }

}