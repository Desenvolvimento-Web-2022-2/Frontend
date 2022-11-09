window.onload = function(){
    let buttons = document.querySelectorAll(`.buttonDiv`)
    buttons.forEach(content=> content.style.display = 'none')
    
    changeMode()
    var sidebar = document.getElementsByClassName("sidebarName").item(0)
    let pathSplit = getPath()

    var AtualizarSala = document.createElement("custom-button")
    AtualizarSala.setAttribute("redirect", `Bloco/${pathSplit[2]}/AtualizarSala/${pathSplit[4]}`)
    AtualizarSala.setAttribute("labelName","Atualizar Sala")
    AtualizarSala.classList.add("save-button")
    AtualizarSala.classList.add("color-white")

    var RemoverSala = document.createElement("custom-button")
    RemoverSala.setAttribute("redirect","/")
    RemoverSala.setAttribute("labelName","Remover Sala")
    RemoverSala.classList.add("save-button")
    RemoverSala.classList.add("color-red")

    var ReservarSala = document.createElement("custom-button")
    ReservarSala.setAttribute("redirect",`Bloco/${pathSplit[2]}/Sala/${pathSplit[4]}/calendar`)
    ReservarSala.setAttribute("labelName","Reservar Sala")
    ReservarSala.classList.add("save-button")
    ReservarSala.classList.add("color-green")
    var CriarComp = document.createElement("custom-button")
    CriarComp.setAttribute("labelName","Adicionar Computador")
    CriarComp.classList.add("save-button")
    CriarComp.classList.add("color-white")

    sidebar.appendChild(AtualizarSala)
    sidebar.appendChild(RemoverSala)
    sidebar.appendChild(ReservarSala)
    sidebar.appendChild(CriarComp)
    setFontStorage()
}
function getPath(){
    let path = window.location.pathname
    return path.split("/")
}