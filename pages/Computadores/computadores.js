
var labelProps = [{
    status: "quebrado",
    model: "positivo",
    patrimonyTag: "123412",
    CPU: "core x9",
    GPU: "type",
    memory: "64gb",
    SO: "windows 11"
},
{    
    status: "funcionando",
    model: "positivo",
    patrimonyTag: "123412",
    CPU: "core x9",
    GPU: "type",
    memory: "64gb",
    SO: "windows 11"
},{
    status: "funcionando",
    model: "positivo",
    patrimonyTag: "123412",
    CPU: "core x9",
    GPU: "type",
    memory: "64gb",
    SO: "windows 11"
},{
    status: "funcionando",
    model: "positivo",
    patrimonyTag: "123412",
    CPU: "core x9",
    GPU: "type",
    memory: "64gb",
    SO: "windows 11"
},]
let labelProp = {
    ustatus: "",
    model: "",
    patrimonyTag: "",
    CPU: "",
    GPU: "",
    memory: "",
    SO: ""
}

window.onload = function(){
    changeMode()
    createCardsComp()
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


function createCardsComp(){
    var cardsContainer = document.getElementById("cards-container")
    for(var i = 0; i<labelProps.length; i++){
        labelProp = labelProps[i]
        userLabel = document.createElement("custom-label-computer");
        userLabel.setAttribute("status",labelProp.status)
        userLabel.setAttribute("model",labelProp.model)
        userLabel.setAttribute("patrimonyTag",labelProp.patrimonyTag)
        userLabel.setAttribute("cpu",labelProp.CPU)
        userLabel.setAttribute("gpu",labelProp.GPU)
        userLabel.setAttribute("memory",labelProp.memory)
        userLabel.setAttribute("so",labelProp.SO)

        userLabel.setAttribute("id",i+1)
        if(i%2 == 0){
            userLabel.classList.add("background-light")
        }
        cardsContainer.appendChild(userLabel)
    }
}