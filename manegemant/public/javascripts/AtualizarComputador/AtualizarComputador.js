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
        let pathSplit = getPath()

        var SalvarAlteracaoComp = document.createElement("custom-button")
        SalvarAlteracaoComp.setAttribute("redirect",`Bloco/${pathSplit[2]}/Sala/${pathSplit[4]}/computadores`)
        SalvarAlteracaoComp.setAttribute("labelName","Salvar")
        SalvarAlteracaoComp.classList.add("save-button")
        SalvarAlteracaoComp.classList.add("color-white")
        sidebar.appendChild(SalvarAlteracaoComp) 
        SalvarAlteracaoComp.setAttribute("onclick","sendFormAttComputador()")
    }
    
}
function getPath(){
    let path = window.location.pathname
    return path.split("/")
}

async function sendFormAttComputador(){
    let pathSplit = getPath()
    let inputs = document.getElementsByTagName("input")

    let modelo = inputs[0].value
    let placa = inputs[1].value
    let placaDeVideo = inputs[2].value
    let processador = inputs[3].value
    let memoria = inputs[4].value
    let SisO = inputs[5].value

    if( !!modelo &&
        !!placa &&
        !!placaDeVideo &&
        !!processador &&
        !!memoria &&
        !!SisO){
            let form = {
                status: "funcionando",
                model: modelo,
                patrimonyTag: placa,
                CPU: processador,
                GPU: placaDeVideo,
                memory: memoria,
                SO: SisO,
                id: pathSplit[6],
                salaId: pathSplit[4]
            }
            let address
            if(pathSplit.includes('AtualizarComputador')) 
                address = `Bloco/${pathSplit[2]}/Sala/${pathSplit[4]}/AtualizarComputador/${pathSplit[6]}`
            else if(pathSplit.includes('CriarComputador')) 
                address = `Bloco/${pathSplit[2]}/Sala/${pathSplit[4]}/CriarComputador`
            console.log(address)
            await fetch(`/${address}`,{
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            }).then(response=> window.location.href = document.referrer)
        }
}