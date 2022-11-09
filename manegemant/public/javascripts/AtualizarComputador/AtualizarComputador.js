window.onload = async function(){
    changeMode()
    let token = sessionStorage.getItem("token")
    if(!token)
        window.location.href = "/login"
    else{
        let permissions = await validateToken(token)
        if(permissions != "Administrador"){
            createButtons(permissions)
        }
        else
            window.location.href = "/"
    }

}
function createButtons(permissions){
    var sidebar = document.getElementsByClassName("sidebarName").item(0)

    var SalvarAlteracaoComp = document.createElement("custom-button")
    SalvarAlteracaoComp.setAttribute("redirect","/")
    SalvarAlteracaoComp.setAttribute("labelName","Salvar")
    SalvarAlteracaoComp.classList.add("save-button")
    SalvarAlteracaoComp.classList.add("color-white")

    sidebar.appendChild(SalvarAlteracaoComp)
}