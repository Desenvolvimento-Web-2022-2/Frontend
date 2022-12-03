function addOption(data){
    filtro = document.querySelector('select')
    for (let i=0; i<data.length; i++){
        let option = document.createElement('option')
        option.setAttribute('value', data[i])
        option.innerHTML = data[i]
        filtro.append(option)
    }

}
async function callFilterItem(route){
    await fetch(`/Filtro/${route}`).then(response=>
        response.json()).then(data=>{
            addOption(data)
        })
}

async function searchFilter(route){
    let ids={
        blocoId:"",
        salaId:""  
    }
    let pathSplited = window.location.pathname.split("/")

    switch(route){
        case "Blocos":
            ids = ids
            break
        case "Computadores":
            ids.blocoId = pathSplited[2]
            ids.salaId = pathSplited[4]
            break
        case "Salas":
            ids.blocoId = pathSplited[2]
            break
        default:
            break
    }

    let input = document.querySelector("#searchBar").value
    let select = document.querySelector("#selectFilter").value
    data = {
        input:input,
        select:select,
        page:route,
        ids:ids
    }
    let resp = await fetch('http://localhost:3000/busca',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    let json = resp.json()
    // return json
}