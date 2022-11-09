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

    var SalvarAlteracaoDept = document.createElement("custom-button")
    SalvarAlteracaoDept.setAttribute("redirect","/")
    SalvarAlteracaoDept.setAttribute("labelName","Salvar")
    SalvarAlteracaoDept.classList.add("save-button")
    SalvarAlteracaoDept.classList.add("color-white")

    sidebar.appendChild(SalvarAlteracaoDept)
}
