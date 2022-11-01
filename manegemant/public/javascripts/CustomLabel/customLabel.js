var PCinfos
const defaultColor={
    "quebrado":"red",
    "funcionando":"green"
  }

function showColapse(id, labelType) {
    button = document.getElementById(`button${id}`)
    button.classList.toggle('arrowInvert')
    let content = document.getElementById(`computerOrUser${id}`)
    if (content.classList.contains("collapsed")) {
        content.style.display = 'none'
    } else {
        content.style.display = 'grid'
    }
    content.classList.toggle("collapsed")
}