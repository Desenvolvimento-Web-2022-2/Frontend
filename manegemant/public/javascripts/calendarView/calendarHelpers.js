class calendarHelpers{
    getYearMouths(){
        let mouthString={
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
        return mouthString
    }
    getMouthMaxDaysByYear(year){
        let maxDays={
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
        return maxDays
    }
}