window.onload = function(){
    changeMode()
    setFontStorage()
    var sidebar = document.getElementsByClassName("sidebarName").item(0)

    var SalvarAlteracaoComp = document.createElement("custom-button")
    SalvarAlteracaoComp.setAttribute("redirect","/")
    SalvarAlteracaoComp.setAttribute("labelName","Salvar")
    SalvarAlteracaoComp.classList.add("save-button")
    SalvarAlteracaoComp.classList.add("color-white")

    sidebar.appendChild(SalvarAlteracaoComp)

}