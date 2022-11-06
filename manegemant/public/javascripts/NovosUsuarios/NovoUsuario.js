window.onload = function(){
    changeMode()
}
const profile={
    "Aluno":"3",
    "Professor":"2",
    "Administrador":"1"
}

function revealSecret(input, button) {
    if(input == 'password'){
        const  input = document.getElementById("senha")
        if (input.getAttribute("type") === "password") {
            input.setAttribute("type", "text");
            button.childNodes[0].setAttribute("src", "images/icons/locker-open.svg")
        } else {
            input.setAttribute("type", "password");
            button.childNodes[0].setAttribute("src", "images/icons/locker.svg")
        }
    }
    else if(input == 'passwordConfirm'){
        const  input = document.getElementById("confirmeSenha")
        if (input.getAttribute("type") === "password") {
            input.setAttribute("type", "text");
            button.childNodes[0].setAttribute("src", "images/icons/locker-open.svg")
        } else {
            input.setAttribute("type", "password");
            button.childNodes[0].setAttribute("src", "images/icons/locker.svg")
        }
    }    
}

async function sendForm(){
    let nomeInput = document.querySelector("#Nome").value
    let emailInput = document.querySelector("#email").value
    let passwordInput = document.querySelector("#senha").value
    let roleInput = document.querySelector("#role").value
    if( !!emailInput &&
        !!nomeInput &&
        !!passwordInput &&
        !!roleInput){
            console.log(nomeInput,emailInput,passwordInput,roleInput)
            let form = {
                name: nomeInput,
                email: emailInput,
                password:passwordInput,
                profileId:profile[roleInput]
            }
            await fetch(`/NovoUsuario`,{
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
