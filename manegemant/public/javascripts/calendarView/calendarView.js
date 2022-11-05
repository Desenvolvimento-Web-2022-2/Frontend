//VIEWTYPE : 'mes' | 'dia' | 'ano'
let viewType = "mes"
let date = new Date()
let currentDay = date.getDate()
let currentYear = date.getFullYear()
let currentMounth = date.getMonth() + 1

let selectYear = date.getFullYear()
let selectMounth
let selectDay
let reservArray = []

let currentSemester =  currentMounth < 7 ? 1:2
let selectSemester = selectMounth < 7 ?  1:2

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
	changeMode()
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
            selectSemester = value < 7 ?  1:2
            view.innerHTML = mouthString[value]+"/"+ selectYear +" - "+selectSemester+"º semestre de "+selectYear
            renderMounth(value)
            break
        default:
            break
    }
}
function renderYear(){
    let cardContainer = document.querySelector("#cards-container-calendar")

    let holder = validateHolderDiv("holder")
    holder.remove()
    holder = validateHolderDiv("holder")

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
    let holder = validateHolderDiv("holder")
    holder.remove()
    holder = validateHolderDiv("holder")

    for(day in weekDay){
        let card = document.createElement("div")
        card.innerHTML = weekDay[day]
        holder.appendChild(card)
    }
    let d = new Date(selectYear,selectMounth-1,1)
    fillDaysCalendar(d.getDay(),selectedMounth,holder)
}

function validateHolderDiv(holderClass){
    let holder    
    if(!!document.querySelector(`.${holderClass}`)){
        holder = document.querySelector(`.${holderClass}`)
    }
    else{
        holder = document.createElement("div")
        holder.setAttribute("class",holderClass)
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
        let auxMounth = selectedMounth-1 == 0 ? 12:selectedMounth-1
        label.innerHTML = (maxDays[auxMounth]-v+j)
        card.appendChild(label)
        holder.appendChild(card)
        cardContainer.appendChild(holder)
    }
    for(let i = v+1; i < parseInt(maxDays[selectedMounth])+v+1; i ++){
        let card = document.createElement("div")
        let a = document.createElement("a")
        a.setAttribute("onclick",`getCalendarInfos(${selectYear},${selectMounth},${i-v},this)`)
        card.setAttribute("class","calendarYearView")
        let label = document.createElement("label")
        label.innerHTML = i-v
        card.appendChild(label)
        a.appendChild(card)
        holder.appendChild(a)
        cardContainer.appendChild(holder)
    }
}

async function getCalendarInfos(year,mouth,day,aTag){
    let a = document.querySelectorAll("a")
    a.forEach(a=>{
        a.removeAttribute("clicked")
    })
    aTag.toggleAttribute("clicked")
    await fetch(`/getCalendar/${day}/${mouth-1}/${year}`).then((response) => response.json())
    .then((data) =>{
        selectDay = day
        generateCalendar(data)
    }).catch(err=>{
        console.error(err)
    })
}

function generateCalendar(data){
    let cardContainer = document.querySelector("#cards-calendar")
    let holder = validateHolderDiv("holderCalendar")
    holder.remove()
    holder = validateHolderDiv("holderCalendar")

    let table = document.createElement("table")
    table.innerHTML=
    `
        <th>Horáriro</th>
        <th>Reservada por:</th>
        <th>Tipo de reserva</th>        
    `
    let hours = formatHour()
    for(let i = 0; i < 7; i++){
        let tr = document.createElement("tr")
        validateDate() ?
        tr.setAttribute("onclick",`selectHorario(this)`) :
        tr.setAttribute("onclick","")
        tr.setAttribute("id",`line`)
        tr.innerHTML = `<td>${hours[i]}</td>
                        <td></td>
                        <td></td>`
        table.appendChild(tr)
    }
    let button = document.createElement("custom-button")
    button.setAttribute("labelName","Enviar Formulário")
    button.toggleAttribute("callFunction")
    button.setAttribute("onclick","sendData()")
    holder.appendChild(table)
    holder.appendChild(button)
    cardContainer.appendChild(holder)
    if(!!data){
        fillTable(data)
    }
}

function validateDate(){
    if(selectYear > currentYear){
        return true
    }
    else if(selectYear == currentYear){
        if(selectMounth > currentMounth){
            return true
        }
        else if(selectMounth == currentMounth){
            return selectDay >= currentDay
        }
    }   
    return false
}


function formatHour(){
    let hours = []
    let aux = 0
    for(let hour = 8; hour < 21; hour+=2){
        hours[aux] = (hour >= 10 ? hour+":00 - "+(hour+2)+":00" : 
        "0"+hour+":00 - " +((hour+2) >=10 ? (hour+2)+":00" :
        "0"+(hour+2)+":00"))
        aux++
    }
    return hours
}

function fillTable(data){
    let lines = document.querySelectorAll("#line")
    data.forEach(dataIt=>{
        for(let i = 0; i < 7; i++){
            if(lines[i].firstChild.innerHTML == dataIt.horario.reservHour){
                lines[i].removeAttribute("onclick")
                let nodes = lines[i].childNodes
                nodes[2].innerHTML = dataIt.reservName
                nodes[4].innerHTML = dataIt.horario.reservType
            }
        }
    })
}

function selectHorario(tr){
    
    tr.toggleAttribute("clicked")
    
}
function sendData() {
	let currentSemester = currentMounth < 7 ? 1 : 2
	let selectSemester = selectMounth < 7 ? 1 : 2
	let formArray = []

	let lines = document.querySelectorAll("#line")
	if(!!lines) {
		lines.forEach(tr => {

			if(tr.hasAttribute("clicked")) {

				let d = new Date(selectYear, selectMounth - 1, selectDay)
				let maxDate = new Date(selectYear, selectSemester == 1 ? 5 : 11, selectSemester == 1 ? 30 : 31)
				let auxDay = selectDay
				let auxMounth = selectMounth - 1
				let auxYear = selectYear

				if (currentSemester != selectSemester || currentYear != selectYear) {
					while (d < maxDate) {
						if (auxDay > maxDays[auxMounth + 1]) {
							auxDay = (parseInt(auxDay) - parseInt(maxDays[auxMounth + 1]))
							auxMounth++
						}
						if (auxMounth > 11) {
							auxMounth = 1;
							auxYear++
						}
						d = new Date(auxYear, auxMounth, auxDay)
						let form = {
							dia: `${auxYear}-${auxMounth}-${auxDay}`,
							userId: "1",
							reservId: "",
							salaId: window.location.pathname.split("/")[4],
							horario: {
								reservHour: tr.firstChild.innerHTML,
								weekDay: weekDay[d.getDay()],
								reservType: "Semester",
								horarioId: ""
							}
						}
						formArray.push(form)
						auxDay = auxDay + 7

					}
				}
				else {
					let form = {
						dia: `${selectYear}-${selectMounth - 1}-${selectDay}`,
						userId: "1",
						reservId: "",
						salaId: window.location.pathname.split("/")[4],
						horario: {
							reservHour: tr.firstChild.innerHTML,
							weekDay: weekDay[d.getDay()],
							reservType: "Day",
							horarioId: ""
						}
					}
					formArray.push(form)
				}
				console.log(formArray)
				
			}
			
		})
	}
	if(!!lines){
		let b = (async () => {
			await fetch("/reservarSala", {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				referrerPolicy: 'no-referrer',
				body: JSON.stringify(formArray)
			}).then(response => {
				window.location.href = window.location.pathname
			}).catch(err => {
				console.error(err)
			});
		})()
	}
    
}