let permissions

window.onload = async function () {
    changeMode()
    let token = sessionStorage.getItem("token")
    if(!token)
        window.location.href = "/login"
    else{
        permissions = await validateToken(token)
    }
}