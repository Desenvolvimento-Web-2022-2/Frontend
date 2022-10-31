const salas = require("../../public/Objects/Salas.json")
const computers = require("../../public/Objects/Computadores.json")

class SalasService{
    returnComputersJson(id){
        let validComputers = []
        computers.Computadores.forEach(computer => {
            if(computer.salaId == id)
            validComputers.push(computer)
        })
        let salaName = salas.Salas.find(sala=> sala.id == id)
        return {
            computers:validComputers,
            name:salaName.name
        }
    }
}
module.exports = new SalasService()