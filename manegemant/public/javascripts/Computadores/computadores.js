let permissions

window.onload = async function(){
    let token = sessionStorage.getItem("token")
    if(!token)
        window.location.href = "/login"
    else{
        permissions = await validateToken(token)
        createButtons(permissions)
        let buttons = document.querySelectorAll(`.buttonDiv`)
        buttons.forEach(content=> content.style.display = 'none')
    }
    changeMode()
    setFontStorage()
    callFilterItem("computadores")

}

function createButtons(){
    let sidebar = document.getElementsByClassName("sidebarName").item(0)
    let pathSplit = getPath()

    if(permissions == "Administrador"){
        let AtualizarSala = document.createElement("custom-button")
        AtualizarSala.setAttribute("redirect", `Bloco/${pathSplit[2]}/AtualizarSala/${pathSplit[4]}`)
        AtualizarSala.setAttribute("labelName","Atualizar Sala")
        AtualizarSala.classList.add("save-button")
        AtualizarSala.classList.add("color-white")
    
        let RemoverSala = document.createElement("custom-button")
        RemoverSala.setAttribute("redirect","/")
        RemoverSala.toggleAttribute("callFunction")
        RemoverSala.setAttribute("onclick",`removeSala(${pathSplit[4]})`)
        RemoverSala.setAttribute("labelName","Remover Sala")
        RemoverSala.classList.add("save-button")
        RemoverSala.classList.add("color-red")

        let ReservarSala = document.createElement("custom-button")
        ReservarSala.setAttribute("redirect",`Bloco/${pathSplit[2]}/Sala/${pathSplit[4]}/calendar`)
        let Reservalabel = permissions == "Administrador" ? "Reservar Sala" : "Visualizar reservas"
        ReservarSala.setAttribute("labelName",Reservalabel)
        ReservarSala.classList.add("save-button")
        ReservarSala.classList.add("color-green")

        let CriarComp = document.createElement("custom-button")
        CriarComp.setAttribute("labelName","Adicionar Computador")
        CriarComp.setAttribute("redirect",`Bloco/${pathSplit[2]}/Sala/${pathSplit[4]}/CriarComputador`)
        CriarComp.classList.add("save-button")
        CriarComp.classList.add("color-white")
       
        sidebar.appendChild(AtualizarSala)
        sidebar.appendChild(RemoverSala)
        sidebar.appendChild(ReservarSala)
        sidebar.appendChild(CriarComp)

    }
}
function getPath(){
    let path = window.location.pathname
    return path.split("/")
}
async function removePC(id){
    await fetch(`/ExcluirComputador/${id}`, { method: 'DELETE' })
    .then(response => {
        console.log('executado com sucesso!')
        window.location.reload()
    })
    .catch(function(err) {
        console.log('erro encontrado');
    });
}    
async function removeSala(id){
    await fetch(`/ExcluiSala/${id}`, { method: 'DELETE' }).then(response => {
        console.log('executado com sucesso!')
        window.location.reload()
    })
    .catch(function(err) {
        console.log('erro encontrado');
    });
}