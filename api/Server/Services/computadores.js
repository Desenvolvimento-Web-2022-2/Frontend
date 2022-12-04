const computers = require("../db/Computadores.json")
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
            status: req.status,
            model: req.model,
            patrimonyTag: req.patrimonyTag,
            CPU: req.CPU,
            GPU: req.GPU,
            memory: req.memory,
            SO: req.SO,
            id:newId.toString(),
            salaId: req.salaId
        }
        computers.Computadores.push(newComputador)
        fs.writeFileSync(path.join(__dirname, '../db/Computadores.json'),JSON.stringify(computers),function(err) {
            if (err) throw err;
            console.log('Computador Cadastrado');
            return newComputador
        })
    }
    postAtt(req){
        let attComputador = {
            status: req.status,
            model: req.model,
            patrimonyTag: req.patrimonyTag,
            CPU: req.CPU,
            GPU: req.GPU,
            memory: req.memory,
            SO: req.SO,
            id: req.id,
            salaId: req.salaId
        }
        computers.Computadores[req.id - 1] = attComputador
        fs.writeFileSync(path.join(__dirname, '../db/Computadores.json'),JSON.stringify(computers),function(err) {
            if (err) throw err;
            console.log('Computador Cadastrado');
            return attComputador
        })
    }


}
module.exports = new ComputadoresService()