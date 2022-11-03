const reservas = require("../../public/Objects/Reserva.json")
const horarios = require("../../public/Objects/Horario.json")

class ReservaService{
    returnReservas(data){
        console.log(data)
        let objReturn = {
            dia:"",
            userId:"",
            reservId:"",
            salaId:"",
            horario:{
                reservHour:"",
                weekDay:"",
                reservType:"",
                horarioId:""
            }
        }
        let respArray = []
        reservas.Reserva.forEach(reserva=>{
            if(reserva.dia == data){
                horarios.Horario.forEach(horario=>{
                    if(horario.horarioId == reserva.horarioId){
                        Object.keys(objReturn).forEach(key=>{
                            if(key == "horario"){
                                let aux = objReturn[key]
                                Object.keys(aux).forEach(keyHorario=>{
                                    aux[keyHorario] = horario[keyHorario]
                                })
                                objReturn[key] = aux
                            }
                            else{
                                objReturn[key] = reserva[key]
                            }
                        })
                        respArray.push(objReturn)
                    }
                })
            }
        })
        return respArray
    }
    
}
module.exports = new ReservaService()