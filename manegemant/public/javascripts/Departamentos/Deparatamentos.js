let permissions

window.onload = function () {
    changeMode()
    validateInfos()
}

function validateInfos(){
    let token = sessionStorage.getItem("token")
    if(!token)
        window.location.href = "/login"
    else{
        permissions = validateToken(token)
        if(!permissions){
            sessionStorage.removeItem("token")
            window.location.href = "/login"
        }
    }
}