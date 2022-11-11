function changeMode() {
  path = document.querySelector("link").getAttribute("href").split("/stylesheet")[0]
  let modeImg = document.getElementById("modeImg")
  if (!!localStorage.getItem("mode")) {
    let links = document.getElementsByTagName("link")
    for (let i = 0; i < links.length; i++) {
      let handleSplit = links[i].href.split(".css")
      if (localStorage.getItem("mode") == "light") {
        links[i].href = handleSplit[0].split("-dark")[0] + ".css"
        modeImg.src = path + "/images/icons/darkMode.svg"
      }
      else {
        if (links[i].href.endsWith(".css")) {
          links[i].href = handleSplit[0] + "-dark.css"
          modeImg.src = path + "/images/icons/lightMode.svg"

        }
      }
    }
  }
}

function lightDarkMode() {
  if (!localStorage.getItem("mode")) {
    localStorage.setItem("mode", "dark")
  }
  else if (localStorage.getItem("mode") == "light") {
    localStorage.setItem("mode", "dark")
  }
  else {
    localStorage.setItem("mode", "light")
  }
  changeMode()
}

async function validateToken(token) {
  let t = {
    token: token
  }
  let req = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(t)
  }
  let resp = await fetch('/validateToken', req)
  let json = await resp.json()
  if(json == "Invalid Token"){
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("userId")

    window.location.href = "/login"
  }
  else
    return json
  

}