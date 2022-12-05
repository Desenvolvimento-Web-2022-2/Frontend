window.onload = async function () {
    let token = sessionStorage.getItem("token")
    if(!token)
        window.location.href = "/login"
    else{
        let permissions = await validateToken(token)
        createButtonSalas(permissions)
    }
    changeMode()
    setFontStorage()
    callFilterItem("salas")
}
function createButtonSalas(permissions){
    let sidebar = document.getElementsByClassName("sidebarName").item(0)

    pathSplit = getPath()
    if(permissions == "Administrador"){
        let updateDepartament = document.createElement("custom-button")
        updateDepartament.setAttribute("redirect",`AtualizarBloco/${pathSplit[(pathSplit.length-2)]}`)
        updateDepartament.setAttribute("labelName","Atualizar departamento")
        updateDepartament.classList.add("color-white")
    
        let removeDepartemet = document.createElement("custom-button")
        removeDepartemet.toggleAttribute("callFunction")
        removeDepartemet.setAttribute("onclick",`removeBloco(${pathSplit[2]})`)
        removeDepartemet.setAttribute("redirect",`RemoverBloco/${pathSplit[(pathSplit.length-2)]}`)
        removeDepartemet.setAttribute("labelName","Remover departamento")
        removeDepartemet.classList.add("color-red")

        let createSala = document.createElement("custom-button")
        createSala.setAttribute("redirect",`bloco/${pathSplit[(pathSplit.length-2)]}/CriarSala/`)
        createSala.setAttribute("labelName","Criar Sala")
        createSala.classList.add("color-green")
    
        sidebar.appendChild(updateDepartament)
        sidebar.appendChild(removeDepartemet)
        sidebar.appendChild(createSala)

    }
}
function getPath(){
    let path = window.location.pathname
    return path.split("/")
}
async function removeBloco(id){
    console.log(id)
    await fetch(`/ExcluirBloco/${id}`, { method: 'DELETE' }).then(response => {
        console.log('executado com sucesso!')
        window.location.reload()
    })
    .catch(function(err) {
        console.log('erro encontrado');
    });
}
