let date = new Date
let year = date.getFullYear()
let day = date.getDate()
let mouth = date.getMonth()
let hours = []

let reserveDay = {
    day:14,
    reserv:[true,false,true,true,false,false,false]
}
const maxDays={
    "1":"31",
    "2":`${year%4 == 0? "28":"29"}`,
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

class CustomCalendar extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback() {
        formatHour()
        const imgPrefix = "../../imgs/"
        this.innerHTML=`
        
        <div class = "mainContainer">
            <div class="arrowsExitContainer">
                <div class = "arrows">
                    <button onclick="handleDate('previous')">
                        <img src="${imgPrefix}icons/arrowRight.svg" style="transform: rotate(180deg);">
                    </button>
                    <div id="date">
                        ${day} de ${mouthString[mouth]} de ${year}
                    </div>
                    <button onclick="handleDate('forward')">
                        <img src="${imgPrefix}icons/arrowRight.svg" style="transform: rotate(0deg);">
                    </button>
                </div>
                <button id="exit"onclick="hide()">X</button>
            </div>
            <table>
                    <tr>
                        <th>Horáriro</th>
                        <th>Reservada</th>
                        <th>Reservar?</th>
                    </tr>
            </table>        
            
        </div>

`
        let infos = document.getElementsByTagName("table")[0]
        
        for(let i = 0; i < 7; i++){
            let tr = document.createElement("tr")
            tr.innerHTML = `<td>${hours[i]}</td>
                            <td>${reserveDay.day == day ? reserveDay.reserv[i] : ""}</td>
                            <td>${(reserveDay.day == day && reserveDay.reserv[i] == false) ? 
                                "<input type='checkbox'>":""}</td>`
            infos.appendChild(tr)
        }
        let mainContainer = document.getElementsByClassName("mainContainer")[0]
        let customButton = document.createElement("custom-button")
        customButton.setAttribute("labelName","Submeter")
        mainContainer.appendChild(customButton)
    }
}
customElements.define("custom-calendar",CustomCalendar)

function generateTableWithInfos(){
    const calendarBody = document.getElementById("calendarBody")
    let calendar = document.createElement("custom-calendar")
    calendarBody.appendChild(calendar)
}

function handleDate(prevForw){
    day = prevForw == "previous" ? day-1 : day+1

    reserveDay = {
        day:day,
        reserv:[(day+1)%2==0,(day+2)%2==0,(day+3)%2==0,(day+4)%2==0,(day+5)%2==0,(day+6)%2==0,(day+7)%2==0]
    }

    let dateHTML = document.getElementById("date")
    if(day <= maxDays[mouth] && day != 0){
    }
    else if(day <= maxDays[mouth] && day <= 0){
        if(mouth == 1){
            year = year-1
            mouth = 12
            day = +maxDays[mouth]
        }
        else{
            mouth = mouth-1
            day = +maxDays[mouth]
        }
    }
    else{
        if(mouth == 12){
            year = year+1
            day = 1
            mouth = 1
        }
        else{
            mouth = mouth+1
            day = 1
        }
    }
    let calendar = document.getElementsByTagName("custom-calendar")[0]
    calendar.remove()
    dateHTML.innerHTML = day+" de "+mouthString[mouth]+" de "+year
    generateTableWithInfos()
}

function formatHour(){
    let aux = 0
    for(let hour = 8; hour < 21; hour+=2){
        hours[aux] = (hour >= 10 ? hour+":00 - "+(hour+2)+":00" : 
        "0"+hour+":00 - " +((hour+2) >=10 ? (hour+2)+":00" :
        "0"+(hour+2)+":00"))
        aux++
    }

    hours
}

function hide(){
    const calendarBody = document.getElementById("calendarBody")
    calendarBody.style.display = "none" 
}