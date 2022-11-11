window.onload = function(){
    changeMode()
    setFontStorage()
    var sidebar = document.getElementsByClassName("sidebarName").item(0)
    let pathSplit = getPath()
    console.log(pathSplit)
    var SalvarAlteracaoComp = document.createElement("custom-button")
    SalvarAlteracaoComp.setAttribute("redirect",`Bloco/${pathSplit[2]}/Sala/${pathSplit[4]}/computadores`)
    SalvarAlteracaoComp.setAttribute("labelName","Salvar")
    SalvarAlteracaoComp.classList.add("save-button")
    SalvarAlteracaoComp.classList.add("color-white")
    sidebar.appendChild(SalvarAlteracaoComp)
    if(pathSplit.includes('CriarComputador')) SalvarAlteracaoComp.setAttribute("onclick","sendFormAttComputador()")
}
function getPath(){
    let path = window.location.pathname
    return path.split("/")
}

async function sendFormAttComputador(){
    let pathSplit = getPath()
    console.log(pathSplit)
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
                salaId: pathSplit[4]
            }
            let address
            if(pathSplit.includes('AtualizarComputador')) 
                address = `Bloco/${pathSplit[2]}/Sala/${pathSplit[4]}/AtualizarComputador/${pathSplit[6]}`
            if(pathSplit.includes('CriarComputador')) 
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
            }).then(response=> console.log(response))
        }
}