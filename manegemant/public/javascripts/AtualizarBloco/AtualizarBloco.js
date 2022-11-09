window.onload = function(){
    changeMode()
    setFontStorage()
    var sidebar = document.getElementsByClassName("sidebarName").item(0)

    var SalvarAlteracaoDept = document.createElement("custom-button")
    SalvarAlteracaoDept.toggleAttribute("callFunction")
    SalvarAlteracaoDept.setAttribute("redirect","/")
    SalvarAlteracaoDept.setAttribute("labelName","Salvar")
    SalvarAlteracaoDept.classList.add("save-button")
    SalvarAlteracaoDept.classList.add("color-white")
    SalvarAlteracaoDept.setAttribute("onclick","sendFormAttSala()")
    sidebar.appendChild(SalvarAlteracaoDept)

}
function getPath(){
    let path = window.location.pathname
    return path.split("/")
}


async function sendFormAttSala(){
    let pathSplit = getPath()
    console.log(pathSplit)
    let inputs = document.getElementsByTagName("input")
    let sigla = inputs[0].value
    let nome = inputs[1].value
    let descricao = inputs[2].value
    if( !!sigla &&
        !!nome &&
        !!descricao){
            console.log(sigla, nome, descricao)
            let form = {
                name: sigla,
                subname: nome,
                numberOrRole: descricao,
                blocoID: pathSplit[2]
            }
            let address
            if(pathSplit.includes('CriarSala')) 
                address = `Bloco/${pathSplit[2]}/CriarSala`
            if(pathSplit.includes('AtualizarSala')) 
                address = `Bloco/${pathSplit[2]}/Sala/${pathSplit[4]}/AtualizarSala`
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
