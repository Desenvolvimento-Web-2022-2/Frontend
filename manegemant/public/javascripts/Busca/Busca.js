window.onload = function(){
    callFilterItem()
} 
function addOption(data){
    filtro = document.querySelector('select')
    for (let i=0; i<data.length; i++){
        let option = document.createElement('option')
        option.setAttribute('value', data[i])
        option.innerHTML = data[i]
        filtro.append(option)
    }

}
async function callFilterItem(){
    await fetch('/Filtro/computadores').then(response=>
        response.json()).then(data=>{
            addOption(data)
        })
        
}