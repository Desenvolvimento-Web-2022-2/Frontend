const salas = require("../../public/Objects/Salas.json")
const computers = require("../../public/Objects/Computadores.json")

class SalasService{
    returnComputersJson(req,id){
        let validComputers = []
        computers.Computadores.forEach(computer => {
            if(computer.salaId == id)
            validComputers.push(computer)
        })
        let salaName = salas.Salas.find(sala=> sala.id == id)
        return {
            computers:validComputers,
            name:salaName.name,
            ids:{
                bloco:req.params.blocoId,
                sala:req.params.salaId,
            }
        }
    }
    returnSalaJson(id){
        let sala = salas.Salas.find(sala=> sala.id == id)

        return !!sala ? sala : {name:"",subname:"",numberOrRole:"",id:"",blocoId:""}
    }
    validateByBloco(blocoId,salaId){
        let sala = this.returnSalaJson(salaId)
        return sala.blocoId == blocoId 
    }
}
module.exports = new SalasService()