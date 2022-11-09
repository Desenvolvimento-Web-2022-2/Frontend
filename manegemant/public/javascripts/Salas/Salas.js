let permissions

window.onload = function () {
    let token = sessionStorage.getItem("token")
    if(!token)
        window.location.href = "/login"
    else{
        permissions = validateToken(token)
        if(!permissions){
            sessionStorage.removeItem("token")
            window.location.href = "/login"
        }
        createButtonSalas()
    }
    
}
function createButtonSalas(){
    let sidebar = document.getElementsByClassName("sidebarName").item(0)

    pathSplit = getPath()
    if(permissions == "Administrador"){
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
}
function getPath(){
    let path = window.location.pathname
    return path.split("/")
}