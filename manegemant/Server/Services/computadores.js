const computers = require("../../public/Objects/Computadores.json")
const SalasService = require("./salas")
class ComputadoresService{
    returnComputer(computerId){
        let computer = computers.Computadores.find(computer=> computer.id == computerId)
        return !!computer ? computer : 
        {
            status: "",
            model: "",
            patrimonyTag: "",
            CPU: "",
            GPU: "",
            memory: "",
            SO: "",
            id: "",
            salaId: ""
        }
    }

    validateByBlocoAndSala(blocoId,salaId,computerId){
        let salaValid = SalasService.validateByBloco(blocoId,salaId)
        let computer = this.returnComputer(computerId)
        computer.salaId == salaId
        return computer.salaId == salaId && salaValid
    }
}
module.exports = new ComputadoresService()