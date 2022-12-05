const validFormatsImgs = [
    ".jpeg",
    ".jpg"
]
let jsonImage

function dropHandler(event) {
    try {
        event.preventDefault();
        const item = event.dataTransfer.items
        if (item.length > 0) {
            const itemAsFile = item[0].getAsFile()
            makeBlob(itemAsFile)
        }
        else {
            throw new Error("Arquivo com problema")
        }
    }
    catch (err) {
        console.error(err)
    }

}

function dragOverHandler(event) {
    event.preventDefault();
}

function uploadImgInput(event) {
    if (event.target.files.length > 0) {
        makeBlob(event.target.files[0])
    }
}

function makeBlob(itemAsFile) {
    let showIconAndName = false

    let name = new String(itemAsFile.name)
    if (jsonImage == "") {
        showIconAndName = true;
    }
    if (validateFormat(name.substring(name.lastIndexOf(".")))) {
        var reader = new FileReader();
        reader.onloadend = function () {
            jsonImage = `${reader.result}`
            !showIconAndName ? showTextAndIcon(name) : updateTextAndIcon(name)
        }
        reader.readAsDataURL(itemAsFile);
    }
    else {
        const formatInvalid = name.substring(name.lastIndexOf("."))
        window.alert("Ocorreu um erro com o upload da imagem:\nFormato inválido " + `${formatInvalid}`)
    }
}

function validateFormat(name){
    return validFormatsImgs.includes(name)
}

function updateTextAndIcon(input, name) {
    let id = `img-label-${input}`;
    let imgLabel = document.querySelector("#" + id);
    imgLabel.innerHTML = name;
}

function showTextAndIcon(name) {
    var elem2 = document.createElement('label');
    elem2.setAttribute('id', `img-label`);
    elem2.innerHTML = name;
    elem2.classList.add("label-icon-upload");
    document.querySelector('#UploadImg').appendChild(elem2);
}
function thisFileUpload() {
    document.getElementById("imgButton").click();
};