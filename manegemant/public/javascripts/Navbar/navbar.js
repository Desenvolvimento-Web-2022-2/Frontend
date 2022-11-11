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
    tamanho = parseInt(localStorage.getItem("fontSize"))
    for(let i=0; i<tamanho; i++){
      changeFontSize(1)
    }
  }
}

function setFontSize(text, index){
  for(let i = 0; i<text.length; i++){
      let fonSize = window.getComputedStyle(text[i]).fontSize
      fonSize = parseInt(fonSize)
      text[i].style.fontSize = `${fonSize+2*index}px`
  }    

}

function changeFontSize(index){
  let paragraph = document.getElementsByTagName("p")
  let a = document.getElementsByTagName("a")
  let label = document.getElementsByTagName("label")
  let div = document.getElementsByTagName("div")
  // Coloca um indice a na função e checa se a letra já foi aumentada 5x
  if(index == 1 && texSize < 6){
      texSize += index
      localStorage.setItem("fontSize", `${texSize}`)
      setFontSize(paragraph, 1)
      setFontSize(a, 1)
      setFontSize(label, 1)
      setFontSize(div, 1)
      //salva em h as tags de titulo de h1 a h6
      for(let i = 1; i<7; i++){
          let h = document.getElementsByTagName(`h${i}`)
          setFontSize(h, 1)
      }
  }
  // Coloca um indice a na função e checa se a letra já foi diminuida 5x
  if(index == -1 && texSize > 0){
      texSize += index
      localStorage.setItem("fontSize", `${texSize}`)
      setFontSize(paragraph, -1)
      setFontSize(a, -1)
      setFontSize(label, -1)
      setFontSize(div, -1)
      for(let i = 1; i<7; i++){
          let h = document.getElementsByTagName(`h${i}`)
          setFontSize(h, -1)
      }
  }
}


