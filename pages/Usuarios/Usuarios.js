var labelProps = [{
    usersInfosName:"John Vasconcelos dos Santos",
    usersInfosEmail : "John@alu.ufc.br",
    usersInfosRole: "desenvolvedor"
},
{
    usersInfosName:"Teodoro Raulino Raul",
    usersInfosEmail : "Teoirado12@gmail.com",
    usersInfosRole: "desenvolvedor"
},{
    usersInfosName:"Italo Severino",
    usersInfosEmail : "italo@bol.com",
    usersInfosRole: "desenvolvedor"
},{
    usersInfosName:"Victor Ehrich Carneiro de Medeiros",
    usersInfosEmail : "victor@gmail.com",
    usersInfosRole: "desenvolvedor"
},]
var labelProp = {
    usersInfosName:"",
    usersInfosEmail : "",
    usersInfosRole: ""
}
window.onload = function () {
    changeMode()
    document.getElementsByClassName("sidebarName").item(0).innerHTML = "Usuários"
    createCardsSalas()
    createButtonSalas()
}

function createCardsSalas(){
    var cardsContainer = document.getElementById("cards-container")
    for(var i = 0; i<labelProps.length; i++){
        labelProp = labelProps[i]
        userLabel = document.createElement("custom-label-user");
        userLabel.setAttribute("usersInfosName",labelProp.usersInfosName)
        userLabel.setAttribute("usersInfosEmail",labelProp.usersInfosEmail)
        userLabel.setAttribute("usersInfosRole",labelProp.usersInfosRole)
        userLabel.setAttribute("id",i+1)
        if(i%2 == 0){
            userLabel.classList.add("background-light")
        }
        cardsContainer.appendChild(userLabel)
    }
}

function createButtonSalas(){
    var sidebar = document.getElementsByClassName("sidebarName").item(0)

    var addUser = document.createElement("custom-button")
    addUser.setAttribute("redirect","/")
    addUser.setAttribute("labelName","+ Adicionar")
    addUser.classList.add("color-white")

    sidebar.appendChild(addUser)
}