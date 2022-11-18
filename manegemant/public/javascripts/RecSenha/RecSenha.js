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