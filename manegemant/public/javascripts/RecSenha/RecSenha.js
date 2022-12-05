window.onload = function(){
    changeMode()
    setFontStorage()
}
function revealSecret(button) {
    const input = document.getElementById("senha")
    if (input.getAttribute("type") === "password") {
        input.setAttribute("type", "text");
        button.childNodes[0].setAttribute("src", "images/icons/locker-open.svg")
    } else {
        input.setAttribute("type", "password");
        button.childNodes[0].setAttribute("src", "images/icons/locker.svg")
    }
}

async function recPassword(){
    let intern = document.querySelector(".intern")
    let p = document.createElement("p")

    let e = document.getElementById("status")
    if(!!e){
        e.remove()
    }

    let data = {
        email:document.querySelector("#email").value,
        password:document.getElementById("senha").value
    }
    let resp = await fetch("http://localhost:3000/RecSenha",{
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        })
    if(resp.status == 201){
        let json = resp.json()
        if(!!json){
            p.innerHTML="Senha alterada, redirecionando..."
            p.setAttribute("id","status")
            p.setAttribute("style","color:green")
            intern.appendChild(p)
            window.location.href = "/login"
        }
    }else{
        p.innerHTML = "Ocorreu um erro"
        p.setAttribute("id","status")
        p.setAttribute("style","color:red")
        intern.appendChild(p)
    }

}