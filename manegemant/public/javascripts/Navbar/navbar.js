var texSize = 0

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
  function logout(){
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("userId")
    window.location.href = "/"
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

function setFontStorage(){
  if(!!localStorage.getItem("fontSize")){
    let tamanho = parseInt(localStorage.getItem("fontSize"))
    console.log(tamanho)
    for(let i=0; i<tamanho; i++){
      changeFontSize(1)
    }
  }
}

function changeFontSize(index){
  let all = ['p', 'label', 'a']
  for(let i = 1; i<7; i++) all.push(`h${i}`)
  console.log(all)
  if((index == 1 && texSize < 6) || (texSize > 0 && index == -1)){
    texSize += index
    localStorage.setItem("fontSize", `${texSize}`)
    for(let i = 0; i<all.length; i++){
      let el = document.getElementsByTagName(all[i])
      for(let j = 0; j<el.length; j++){
        let fonSize = window.getComputedStyle(el[j]).fontSize
        fonSize = parseInt(fonSize)
        el[j].style.fontSize = `${fonSize+2*index}px`
      }
    }
  }
}


