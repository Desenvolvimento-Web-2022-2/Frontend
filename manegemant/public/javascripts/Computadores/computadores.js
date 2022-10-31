window.onload = function(){
    let buttons = document.querySelectorAll(`.buttonDiv`)
    buttons.forEach(content=> content.style.display = 'none')
    
    changeMode()
    var sidebar = document.getElementsByClassName("sidebarName").item(0)

    var AtualizarSala = document.createElement("custom-button")
    AtualizarSala.setAttribute("redirect","/")
    AtualizarSala.setAttribute("labelName","Atualizar Sala")
    AtualizarSala.classList.add("save-button")
    AtualizarSala.classList.add("color-white")

    var RemoverSala = document.createElement("custom-button")
    RemoverSala.setAttribute("redirect","/")
    RemoverSala.setAttribute("labelName","Remover Sala")
    RemoverSala.classList.add("save-button")
    RemoverSala.classList.add("color-red")

    var ReservarSala = document.createElement("custom-button")
    ReservarSala.setAttribute("redirect","/")
    ReservarSala.setAttribute("labelName","Reservar Sala")
    ReservarSala.classList.add("save-button")
    ReservarSala.classList.add("color-green")
   
    sidebar.appendChild(AtualizarSala)
    sidebar.appendChild(RemoverSala)
    sidebar.appendChild(ReservarSala)
    
}