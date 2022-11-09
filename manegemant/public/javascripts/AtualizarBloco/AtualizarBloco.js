window.onload = function(){
    changeMode()
    setFontStorage()

    var sidebar = document.getElementsByClassName("sidebarName").item(0)

    var SalvarAlteracaoDept = document.createElement("custom-button")
    SalvarAlteracaoDept.setAttribute("redirect","/")
    SalvarAlteracaoDept.setAttribute("labelName","Salvar")
    SalvarAlteracaoDept.classList.add("save-button")
    SalvarAlteracaoDept.classList.add("color-white")

    sidebar.appendChild(SalvarAlteracaoDept)

}