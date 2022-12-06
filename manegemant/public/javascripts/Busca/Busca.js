function addOption(data){
    filtro = document.querySelector('select')
    for (let i=0; i<data.length; i++){
        let option = document.createElement('option')
        option.setAttribute('value', data[i])
        option.innerHTML = data[i]
        filtro.append(option)
    }

}
async function callFilterItem(route){
    await fetch(`/Filtro/${route}`).then(response=>
        response.json()).then(data=>{
            addOption(data)
        })
}

async function searchFilter(route){
    let ids={
        blocoId:"",
        salaId:""  
    }
    let pathSplited = window.location.pathname.split("/")

    switch(route){
        case "Blocos":
            ids = ids
            break
        case "Computadores":
            ids.blocoId = pathSplited[2]
            ids.salaId = pathSplited[4]
            break
        case "Salas":
            ids.blocoId = pathSplited[2]
            break
        default:
            break
    }

    let input = document.querySelector("#searchBar").value
    let select = document.querySelector("#selectFilter").value
    data = {
        input:input,
        select:select,
        page:route,
        ids:ids
    }
    let resp = await fetch('http://localhost:3000/busca',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    let json = await resp.json()
    handleScreen(data,json)
}
function handleScreen(data,json){
    if(data.page == "Blocos" || data.page == "Salas"){
        let ext = document.querySelectorAll(".ext")
        ext.forEach(e=>{
            e.remove()
        })
    }
    else if(data.page == "Computadores"){
        let mainContainerComputerRemove = document.querySelectorAll(".mainContainer-computer")
        mainContainerComputerRemove.forEach(e=>{
            e.remove()
        })
    }
    else if(data.page == "Users"){
        let mainContainerUserRemove = document.querySelectorAll(".mainContainer-userLabel ")
        mainContainerUserRemove.forEach(e=>{
            e.remove()
        })
    }
    constructPage(data,json)
     
}
function constructPage(data,json){
    if(data.page == "Blocos" || data.page == "Salas"){
        let cardContainer = document.querySelector("#cards-container")
        json.forEach(element=>{
            let newExt = document.createElement("div")
            newExt.setAttribute("class","ext")
            let blocoSalaHandler = data.page == "Blocos" ? "bloco" : "sala"
            newExt.setAttribute("onclick",`redirectToDep("${blocoSalaHandler}/${element.id}/")`)
            let img = document.createElement("img")
            if(!!element.img){
                img.setAttribute("src",element.img)
            }
            else{
                img.setAttribute("src","/images/ft-fachada-deti.jpg")
            }

            img.setAttribute("alt","imagem")
            let p1 = document.createElement("p")
            p1.innerHTML = element.name
            let pTooltip = document.createElement("p")
            pTooltip.setAttribute("class","tooltip")
            pTooltip.innerHTML = element.subname
            let spanTooltip = document.createElement("span")
            spanTooltip.setAttribute("class","tooltiptext")
            spanTooltip.innerHTML = element.subname
            let pnumber = document.createElement("p")
            pnumber.innerHTML = element.numberOrRole
            pTooltip.appendChild(spanTooltip)
            newExt.appendChild(img)
            newExt.appendChild(p1)
            newExt.appendChild(pTooltip)
            newExt.appendChild(pnumber)
            cardContainer.appendChild(newExt)
        }) 
    }
       
    else if(data.page =="Computadores"){
        let cardsContainerComputer = document.querySelector("#cards-container-computer")
        json.forEach((element,index)=>{
            let mainContainerComputer = document.createElement("div")
            if(((index +1) % 2) == 0){
                mainContainerComputer.setAttribute("class","mainContainer-computer background-light")
            }
            else{
                mainContainerComputer.setAttribute("class","mainContainer-computer")
            }
            mainContainerComputer.setAttribute("onclick",`showColapse("${element.id}")`)

            let handler = document.createElement("div")
            handler.setAttribute("class","handler") 

            let status = document.createElement("div")
            status.setAttribute("class","status") 

            let cicle = document.createElement("div")
            cicle.setAttribute("class",`circle ${element.status}`) 

            let statusP = document.createElement("p")
            statusP.innerHTML = element.status

            status.appendChild(cicle)
            status.appendChild(statusP)
            handler.appendChild(status)

            let pModel = document.createElement("p")
            pModel.innerHTML = element.model
            handler.appendChild(pModel)

            let pPatrimonyTag = document.createElement("p")
            pPatrimonyTag.innerHTML = element.patrimonyTag
            handler.appendChild(pPatrimonyTag)

            let button = document.createElement("div")
            button.setAttribute("class","botao") 

            let button2 = document.createElement("button")
            button2.setAttribute("id",`button${element.id}`) 

            let arrowImg = document.createElement("img")
            arrowImg.setAttribute("src","/images/icons/ArrowDown.svg") 
            arrowImg.setAttribute("id","arrow") 
            arrowImg.setAttribute("class","arrow") 


            button2.appendChild(arrowImg)
            button.appendChild(button2)
            handler.appendChild(button)
            
            let buttonDiv = document.createElement("div")
            buttonDiv.setAttribute("class","buttonDiv") 
            buttonDiv.setAttribute("id",`computerOrUser${element.id}`) 
            buttonDiv.setAttribute("style","display: none;") 
            
            let colapsed = document.createElement("div")
            colapsed.setAttribute("class","colapsed") 

            let hr = document.createElement("hr")
            hr.setAttribute("style","width: 98%; background-color: black; margin: 0") 

            colapsed.appendChild(hr)

            let colapInfos = document.createElement("div")
            colapInfos.setAttribute("class","colapInfos")
            
            let colapInfosDiv1 = document.createElement("div")

            let processador = document.createElement("p")
            processador.innerHTML = "Processador"
            let processadorInfo = document.createElement("p")
            processadorInfo.innerHTML = element.CPU
            
            colapInfosDiv1.appendChild(processador)
            colapInfosDiv1.appendChild(processadorInfo)

            colapInfos.appendChild(colapInfosDiv1)


            let colapInfosDiv2 = document.createElement("div")

            let video = document.createElement("p")
            video.innerHTML = "Placa de vídeo"
            let videoInfo = document.createElement("p")
            videoInfo.innerHTML = element.GPU

            colapInfosDiv2.appendChild(video)
            colapInfosDiv2.appendChild(videoInfo)

            colapInfos.appendChild(colapInfosDiv2)


            let colapInfosDiv3 = document.createElement("div")

            let memory = document.createElement("p")
            memory.innerHTML = "Memória"
            let memoryInfo = document.createElement("p")
            memoryInfo.innerHTML = element.memory

            colapInfosDiv3.appendChild(memory)
            colapInfosDiv3.appendChild(memoryInfo)

            colapInfos.appendChild(colapInfosDiv3)

            let colapInfosDiv4 = document.createElement("div")

            let so = document.createElement("p")
            so.innerHTML = "Sistema Operacional"
            let soInfos = document.createElement("p")
            soInfos.innerHTML = element.SO

            colapInfosDiv4.appendChild(so)
            colapInfosDiv4.appendChild(soInfos)

            colapInfos.appendChild(colapInfosDiv4)
            
            colapsed.appendChild(colapInfos)
            
            let hr2 = document.createElement("hr")
            hr2.setAttribute("style","width: 98%; background-color: black; margin: 0") 
            colapsed.appendChild(hr2)

            let colapButtons = document.createElement("div")
            colapButtons.setAttribute("class","colapButtons")
            let customButton1 = document.createElement("custom-button")
            customButton1.setAttribute("class","color-white")
            customButton1.setAttribute("labelname","Atualizar Computador")
            customButton1.setAttribute("redirect",`Bloco/${data.ids.blocoId}/Sala/${data.ids.salaId}/AtualizarComputador/${element.id}`)

            colapButtons.appendChild(customButton1)

            let customButton2 = document.createElement("custom-button")
            customButton2.setAttribute("class","color-red")
            customButton2.setAttribute("labelname","Excluir Computador")
            customButton2.setAttribute("onclick",`removePC('${element.id}')`)
            customButton2.toggleAttribute("callFunction")

            colapButtons.appendChild(customButton2)
            colapsed.appendChild(colapButtons)
            buttonDiv.appendChild(colapsed)

            mainContainerComputer.appendChild(handler)
            mainContainerComputer.appendChild(buttonDiv)
            cardsContainerComputer.appendChild(mainContainerComputer)
        })
    }  
    else if(data.page =="Users"){
        let cardContainer = document.querySelector("#cards-container")
        json.forEach((element,index)=>{
            let mainContainerUser = document.createElement("div")
            if(((index +1) % 2) == 0){
                mainContainerUser.setAttribute("class","mainContainer-userLabel background-light")
            }
            else{
                mainContainerUser.setAttribute("class","mainContainer-userLabel ")  
            }
            mainContainerUser.setAttribute("onclick",`showColapse("${element.id}")`)

            let firstLayer = document.createElement("div")
            firstLayer.setAttribute("class","firstLayer")
            
            let itensDiv = document.createElement("div")
            itensDiv.setAttribute("class","itensDiv")
            let itensDivContent = [
                "Nome","Email","Cargo",`${element.usersInfosName}`,`${element.usersInfosEmail}`,`${element.profile.name}`
            ]
            for(let i = 0; i<6;i++){
                let p = document.createElement("p")
                p.innerHTML = itensDivContent[i]
                itensDiv.appendChild(p)
            }
            firstLayer.appendChild(itensDiv)

            let button = document.createElement("div")
            button.setAttribute("class","botao") 

            let button2 = document.createElement("button")
            button2.setAttribute("id",`button${element.id}`) 

            let arrowImg = document.createElement("img")
            arrowImg.setAttribute("src","/images/icons/ArrowDown.svg") 
            arrowImg.setAttribute("id","arrow") 
            arrowImg.setAttribute("class","arrow") 

            button2.appendChild(arrowImg)
            button.appendChild(button2)
            firstLayer.appendChild(button)

            mainContainerUser.appendChild(firstLayer)

            let buttonDiv = document.createElement("div")
            buttonDiv.setAttribute("class","buttonDiv") 
            buttonDiv.setAttribute("id",`computerOrUser${element.id}`) 
            buttonDiv.setAttribute("style","display: none;") 

            let hr = document.createElement("hr")
            hr.setAttribute("style","width: 98%; background-color: black;")
            buttonDiv.appendChild(hr)

            let buttonsDiv = document.createElement("div")
            buttonsDiv.setAttribute("class","buttonsDiv") 

            let customButton1 = document.createElement("custom-button")
            customButton1.setAttribute("class","color-white")
            customButton1.setAttribute("labelname","Atualizar")
            customButton1.setAttribute("redirect",`AtualizarUsuario/${element.id}`)

            buttonsDiv.appendChild(customButton1)

            let customButton2 = document.createElement("custom-button")
            customButton2.setAttribute("class","color-red")
            customButton2.setAttribute("labelname","Remover")
            customButton2.setAttribute("onclick",`removeUser('${element.id}')`)
            customButton2.toggleAttribute("callFunction")

            buttonsDiv.appendChild(customButton2)
            buttonDiv.appendChild(buttonsDiv)
            mainContainerUser.appendChild(buttonDiv)
            cardContainer.appendChild(mainContainerUser)
        })

    }
}