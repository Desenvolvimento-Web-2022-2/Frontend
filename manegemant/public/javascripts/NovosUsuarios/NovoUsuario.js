window.onload = function(){
    changeMode()
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
