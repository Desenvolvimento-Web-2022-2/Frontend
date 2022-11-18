const computers = require("../../public/Objects/Computadores.json")
const SalasService = require("./salas")
var fs = require('fs');
var path = require('path');
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

    post(req){
        let newId = !!computers.Computadores[computers.Computadores.length-1] ? parseInt(computers.Computadores[computers.Computadores.length-1].id)+1 : 1
        let newComputador = {
            status: req.body.status,
            model: req.body.model,
            patrimonyTag: req.body.patrimonyTag,
            CPU: req.body.CPU,
            GPU: req.body.GPU,
            memory: req.body.memory,
            SO: req.body.SO,
            id:newId.toString(),
            salaId: req.body.salaId
        }
        computers.Computadores.push(newComputador)
        fs.writeFileSync(path.join(__dirname, '../../public/Objects/Computadores.json'),JSON.stringify(computers),function(err) {
            if (err) throw err;
            console.log('Computador Cadastrado');
            return newComputador
        })
    }
    postAtt(req){
        let attComputador = {
            status: req.body.status,
            model: req.body.model,
            patrimonyTag: req.body.patrimonyTag,
            CPU: req.body.CPU,
            GPU: req.body.GPU,
            memory: req.body.memory,
            SO: req.body.SO,
            id: req.body.id,
            salaId: req.body.salaId
        }
        computers.Computadores[req.body.id - 1] = attComputador
        fs.writeFileSync(path.join(__dirname, '../../public/Objects/Computadores.json'),JSON.stringify(computers),function(err) {
            if (err) throw err;
            console.log('Computador Cadastrado');
            return attComputador
        })
    }


}
module.exports = new ComputadoresService()