const acconts = [{
    user: "victor",
    password: "password"
}, {
    user: "john",
    password: "password"
},
] 

function redirectToNewPassword() {
    console.log("redirecting ...")
}
function login() {
    const user = document.querySelector("input.user").value
    const password = document.querySelector("input.password").value
    let exist = false
    acconts.map(accont=>{
        if(accont.user === user && accont.password === password){
            exist = true
        }
    })
    const msg = exist == true ? "logado com sucesso" : "usuario ou senha errado" 
    console.log(msg)
}
function revealSecret() {
    const input = document.querySelector("input.password");
    const secret = document.querySelector("img.secret")
    if (input.getAttribute("type") === "password") {
        input.setAttribute("type", "text");
        secret.setAttribute("src", "../Assets/Icons/visibility-off.svg")
    } else {
        input.setAttribute("type", "password");
        secret.setAttribute("src", "../Assets/Icons/visibility.svg")
    }
}