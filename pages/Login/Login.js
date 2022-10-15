window.onload = function(){
    changeMode()
    changeLogo()
}
function changeLogo(){
    let logo = document.getElementById("logo")
    if (!localStorage.getItem("mode")) {
        logo.setAttribute("src","../../imgs/logo-ufc-black.svg")
    }
    else if(localStorage.getItem("mode") == "light"){
        logo.setAttribute("src","../../imgs/logo-ufc-black.svg")
    }
    else{
        logo.setAttribute("src","../../imgs/logo-ufc.svg")
    }
}
function revealSecret(button) {
        const input = document.getElementById("senha")
        if (input.getAttribute("type") === "password") {
            input.setAttribute("type", "text");
            button.childNodes[0].setAttribute("src", "../../imgs/icons/locker-open.svg")
        } else {
            input.setAttribute("type", "password");
            button.childNodes[0].setAttribute("src", "../../imgs/icons/locker.svg")
        }
}