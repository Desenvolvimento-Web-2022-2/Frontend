onDOMContentLoaded = (event) => 

{
    if (document.readyState === 'complete')
    {
        let token = sessionStorage.getItem("token")
        if(!token)
            window.location.href = "/login"
        else{
            permissions = validateToken(token)
            if(!permissions){
                sessionStorage.removeItem("token")
                window.location.href = "/login"
            }
            if(permissions != "Administrador")
                window.location.href = ""
        }
    }
};

let permissions
window.onload = function(){
    changeMode()

    var sidebar = document.getElementsByClassName("sidebarName").item(0)

    var SalvarAlteracaoDept = document.createElement("custom-button")
    SalvarAlteracaoDept.setAttribute("redirect","/")
    SalvarAlteracaoDept.setAttribute("labelName","Salvar")
    SalvarAlteracaoDept.classList.add("save-button")
    SalvarAlteracaoDept.classList.add("color-white")

    sidebar.appendChild(SalvarAlteracaoDept)

}
