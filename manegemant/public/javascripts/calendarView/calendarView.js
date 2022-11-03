//VIEWTYPE : 'mes' | 'dia' | 'ano'
let viewType = "mes"
let date = new Date
let selectYear = date.getFullYear()
let selectMounth
let selectDay

const weekDay = {
    "0":"Domingo",
    "1":"Segunda",
    "2":"Terça",
    "3":"Quarta",
    "4":"Quinta",
    "5":"Sexta",
    "6":"Sabado",
}

let mouth = date.getMonth()
const mouthString={
    "1":"Janeiro",
    "2":"Fevereiro",
    "3":"Março",
    "4":"Abril",
    "5":"Maio",
    "6":"Junho",
    "7":"Julho",
    "8":"Agosto",
    "9":"Setembro",
    "10":"Outubro",
    "11":"Novembro",
    "12":"Decembro" 
}
function getMaxDays(){
    let maxDays={
        "1":"31",
        "2":`${selectYear%4 == 0? "29":"28"}`,
        "3":"31",
        "4":"30",
        "5":"31",
        "6":"30",
        "7":"31",
        "8":"31",
        "9":"30",
        "10":"31",
        "11":"30",
        "12":"31"
    }
    return maxDays
}
let maxDays = getMaxDays()

window.onload =function(){
    viewType = "ano"
    renderViewByType(viewType)
}

function changeType(type){
    viewType = type
    renderViewByType(viewType)
}

function renderViewByType(viewTypeSelected,value=0){
    let view = document.querySelector(".viewType")
    viewType = viewTypeSelected
    switch(viewType){
        case 'ano':
            view.innerHTML = 'Ano - ' + selectYear
            renderYear()
            break
        case 'mes':
            view.innerHTML = "Mes - " + mouthString[value]+"/"+ selectYear
            renderMounth(value)
            break
        case 'dia':
            renderDay(value)
            break
        default:
            break
    }
}
function renderYear(){
    let cardContainer = document.querySelector("#cards-container-calendar")

    let holder = validateHolderDiv()
    holder.remove()
    holder = validateHolderDiv()

    for(let i = 1; i <= 12; i ++){
        let card = document.createElement("div")
        let a = document.createElement("a")
        a.setAttribute("onclick",`renderViewByType('mes','${i}')`)
        card.setAttribute("class","calendarYearView")
        let label = document.createElement("label")
        label.innerHTML = mouthString[i]
        card.appendChild(label)
        a.appendChild(card)
        holder.appendChild(a)
        cardContainer.appendChild(holder)
    }
}

function renderMounth(selectedMounth){
    selectMounth = selectedMounth
    let holder = validateHolderDiv()
    holder.remove()
    holder = validateHolderDiv()

    for(day in weekDay){
        let card = document.createElement("div")
        card.innerHTML = weekDay[day]
        holder.appendChild(card)
    }
    let d = new Date(`${selectYear}-${selectMounth}-${1}`)
    fillDaysCalendar(d.getDay(),selectedMounth,holder)
}

function renderDay(selectedDay){
    let cardContainer = document.querySelector("#cards-container-calendar")
    selectDay = selectedDay
    let holder = validateHolderDiv()
    holder.remove()
    holder = validateHolderDiv()
   
}

function validateHolderDiv(){
    let holder    
    if(!!document.querySelector(".holder")){
        holder = document.querySelector(".holder")
    }
    else{
        holder = document.createElement("div")
        holder.setAttribute("class","holder")
    }
    return holder
}

function handleDate(previousFoward){
    switch(viewType){
        case 'ano':
            if(previousFoward == 'previous')
                selectYear --
            else if(previousFoward == 'foward')
                selectYear ++
            break
        case 'mes':
            if(previousFoward == 'previous'){
                selectMounth --
                if(selectMounth == 0){
                    selectMounth = 12
                    selectYear --
                }
            }
            else if(previousFoward == 'foward'){
                selectMounth ++
                if(selectMounth == 13){
                    selectMounth = 1
                    selectYear ++
                }
            }            
            break
        case 'dia':
            if(previousFoward == 'previous'){
                selectDay --
                if(selectDay == 0){
                    selectMounth --
                    selectDay = maxDays[selectMounth]
                }
                if(selectMounth == 0){
                    selectMounth = 12
                    selectYear --
                }
            }
               
            else if(previousFoward == 'foward'){
                selectDay ++
                if(selectDay == maxDays[selectMounth]+1){
                    selectDay = 1
                    selectMounth ++
                }
                if(selectMounth == 13){
                    selectMounth = 1
                    selectYear ++
                }
            }                
            break
        default:
            break 
    }
    maxDays = getMaxDays()
    renderViewByType(viewType,selectMounth)
}


function fillDaysCalendar(v,selectedMounth,holder){
    let cardContainer = document.querySelector("#cards-container-calendar")

    for(let j = 1;j<=v;j++){
        let card = document.createElement("div")
        let a = document.createElement("a")
        card.setAttribute("class","calendarYearViewPast")
        let label = document.createElement("label")
        label.innerHTML = (maxDays[selectedMounth-1]-v+j)
        card.appendChild(label)
        holder.appendChild(card)
        cardContainer.appendChild(holder)
    }
    for(let i = v+1; i < parseInt(maxDays[selectedMounth])+v+1; i ++){
        let card = document.createElement("div")
        let a = document.createElement("a")
        a.setAttribute("onclick",`teste(${selectYear},${selectMounth},${i-v})`)
        card.setAttribute("class","calendarYearView")
        let label = document.createElement("label")
        label.innerHTML = i-v
        card.appendChild(label)
        a.appendChild(card)
        holder.appendChild(a)
        cardContainer.appendChild(holder)
    }
}

async function teste(year,mouth,day){
    await fetch(`/getCalendar/${day}/${mouth}/${year}`).then((response) => response.json())
    .then((data) =>{
        console.log(data)
    }).catch(err=>{
        console.error(err)
    })
}