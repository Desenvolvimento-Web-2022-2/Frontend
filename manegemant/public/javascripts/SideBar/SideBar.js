function checkSideBarImg(){
    let reqimg = "http://localhost:3000/"
    if(!!sessionStorage.getItem("userImg")){
        const localImage = sessionStorage.getItem("userImg")
        let sidebarUserInfos = document.getElementsByClassName("userInfos")[0]

        let l = document.createElement("label")
        l.innerHTML = `Bem vindo ${sessionStorage.getItem("userName")}`
        if(localImage != "Not Found"){
            let img = document.createElement("img")
            img.setAttribute("src",localImage)
            sidebarUserInfos.appendChild(img)
            sidebarUserInfos.appendChild(l)
        }
        else{
            let img = document.createElement("img")
            img.setAttribute("src",reqimg+"images/ft-707-interior.jpg")
            sidebarUserInfos.appendChild(img)
            sidebarUserInfos.appendChild(l)
        }
    }
}