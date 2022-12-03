window.onload = async function(){
    changeMode()
    let token = sessionStorage.getItem("token")
    if(!token)
        window.location.href = "/login"
    else{
        let permissions = await validateToken(token)
        if(permissions == "Administrador"){
            createButtons(permissions)
        }
        else
            window.location.href = "/"
    }
    setFontStorage()
}

function createButtons(permissions){
    if(permissions == "Administrador"){
        var sidebar = document.getElementsByClassName("sidebarName").item(0)
        var SalvarAlteracaoDept = document.createElement("custom-button")
        SalvarAlteracaoDept.toggleAttribute("callFunction")
        SalvarAlteracaoDept.setAttribute("redirect","")
        SalvarAlteracaoDept.setAttribute("labelName","Salvar")
        SalvarAlteracaoDept.classList.add("save-button")
        SalvarAlteracaoDept.classList.add("color-white")
        SalvarAlteracaoDept.setAttribute("onclick","sendFormAttSala()")
        sidebar.appendChild(SalvarAlteracaoDept)
    }

}

function getPath(){
    let path = window.location.pathname
    return path.split("/")
}


async function sendFormAttSala(){
    let pathSplit = getPath()
    let inputs = document.getElementsByTagName("input")
    let sigla = inputs[0].value
    let nome = inputs[1].value
    let descricao = inputs[2].value

    if( !!sigla &&
        !!nome &&
        !!descricao){
            let form = {
                name: sigla,
                subname: nome,
                numberOrRole: descricao,
                blocoID: pathSplit[2],
                salaID: pathSplit[4]
            }
            let address
            if(pathSplit.includes('CriarSala')) 
                address = `Bloco/${pathSplit[2]}/CriarSala`
            if(pathSplit.includes('AtualizarSala')) 
                address = `Bloco/${pathSplit[2]}/AtualizarSala/${pathSplit[4]}`
            if(pathSplit.includes('CriarBloco'))
                address = 'CriarBloco'
            if(pathSplit.includes('AtualizarBloco'))    
                address = `AtualizarBloco/${pathSplit[2]}`
            let method = (pathSplit.includes('AtualizarBloco') || pathSplit.includes('AtualizarSala')) ? 'PUT' : 'POST'
            await fetch(`/${address}`,{
                method: method,
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            }).then(response=> window.location.href=document.referrer)            
        }

}
