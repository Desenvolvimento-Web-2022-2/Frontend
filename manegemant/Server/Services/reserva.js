const reservas = require("../../public/Objects/Reserva.json")
const horarios = require("../../public/Objects/Horario.json")
const users = require("../../public/Objects/users.json")
var fs = require('fs');
var path = require('path');

class ReservaService{
    returnReservas(data){
        let respArray = []
        reservas.Reserva.forEach(reserva=>{
            if(reserva.dia == data){
                horarios.Horario.forEach(horario=>{
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
                        },
                        reservName:""
                    }
                    if(horario.horarioId == reserva.horarioId){
                        Object.keys(objReturn).forEach(key=>{
                            if(key == "horario"){
                                let aux = objReturn[key]
                                Object.keys(aux).forEach(keyHorario=>{
                                    aux[keyHorario] = horario[keyHorario]
                                })
                                objReturn[key] = aux
                            }
                            else if(key == "reservName"){
                                objReturn[key] = users.Users.find(user=> user.userId == reserva.userId).usersInfosName
                            }
                            else{
                                objReturn[key] = reserva[key]
                                console.log(objReturn[key],reserva[key])
                            }
                        })
                        respArray.push(objReturn)
                    }
                })
            }
        })
        console.log(respArray)

        return respArray
    }
    criarReserva(body){
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
            },
            reservName:""
        } 
        let checkUser = []
        body.forEach(bodyInfos=>{
            checkUser.push(users.Users.find(user=>{user.userId == bodyInfos.userId}))
        })
        checkUser.forEach(check=>{
            if(!checkUser)
                throw new Error("Usuário inválido")
        })

        let lastReserva = reservas.Reserva[reservas.Reserva.length-1]
        let lastHorario = horarios.Horario[horarios.Horario.length-1]

        let newReservaId = !!lastReserva ? parseInt(lastReserva.reservId)+1 : 1
        let newHorarioId = !!lastHorario ? parseInt(lastHorario.horarioId)+1 : 1

        body.forEach(bodyInfos=>{
            let reservaObj = {
                "dia": bodyInfos.dia,
                "userId":bodyInfos.userId,
                "reservId":newReservaId.toString(),
                "salaId":bodyInfos.salaId,
                "horarioId":newHorarioId.toString()
            }
            reservas.Reserva.push(reservaObj)
            fs.writeFileSync(path.join(__dirname, '../../public/Objects/Reserva.json'),JSON.stringify(reservas),function(err) {
                if (err) throw err;
                console.log('Reserva complete');
            })

            let horarioObj = {
                "reservHour": bodyInfos.horario.reservHour,
                "weekDay":bodyInfos.horario.weekDay,
                "reservType": bodyInfos.horario.reservType,
                "horarioId": newHorarioId.toString()
            }
            horarios.Horario.push(horarioObj)

            fs.writeFileSync(path.join(__dirname, '../../public/Objects/Horario.json'),JSON.stringify(horarios),function(err) {
                if (err) throw err;
                console.log('Horario complete');
            })
            newReservaId ++
            newHorarioId ++
        })

        return "Ok"
        }
         
    
}
module.exports = new ReservaService()