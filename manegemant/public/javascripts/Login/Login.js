window.onload = function () {
    changeMode()
    changeLogo()
    setFontStorage()
}
function changeLogo() {
    let logo = document.getElementById("logo")
    if (!localStorage.getItem("mode")) {
        logo.setAttribute("src", "images/logo-ufc-black.svg")
    }
    else if (localStorage.getItem("mode") == "light") {
        logo.setAttribute("src", "images/logo-ufc-black.svg")
    }
    else {
        logo.setAttribute("src", "images/logo-ufc.svg")
    }
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

async function sendForm() {
    let emailInput = document.querySelector("#email").value
    let passwordInput = document.querySelector("#senha").value
    let form = {
        email: emailInput,
        password: passwordInput
    }
    await fetch(`/authenticate`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    }).then(response => response.json()).then(data => {
        if (data.status == "valid"){
            sessionStorage.setItem("token", data.token)
            sessionStorage.setItem("userId",data.userId)
            window.location.href = "/"
        }
    })
}