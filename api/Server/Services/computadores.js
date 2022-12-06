const SalasService = require("./salas")
var fs = require('fs');
var path = require('path');
let blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
let salas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Salas.json'), 'utf8'))
let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
let computers = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Computadores.json'), 'utf8'))
let reservas = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Reserva.json"), 'utf8'))
let horarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Horario.json"), 'utf8'))

class ComputadoresService{
    returnComputer(computerId){
        refreshbd()
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
        refreshbd()
        let salaValid = SalasService.validateByBloco(blocoId,salaId)
        let computer = this.returnComputer(computerId)
        computer.salaId == salaId
        return computer.salaId == salaId && salaValid
    }

    post(req){
        refreshbd()
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
        })
        return newComputador
    }
    postAtt(req){
        refreshbd()
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
        for(let j=0; j<computers.Computadores.length; j++){
            if(computers.Computadores[j].id == attComputador.id){
                computers.Computadores[j] =attComputador
            }
        }
        // computers.Computadores[req.id - 1] = attComputador
        fs.writeFileSync(path.join(__dirname, '../db/Computadores.json'),JSON.stringify(computers),function(err) {
            if (err) throw err;
            console.log('Computador Cadastrado');
        })
        return attComputador
    }
    deleteComp(id){
        refreshbd()
        let status = {
            isDeleted: true,
            compId: id
        }
        let newComputers = []
        for(let i=0; i<computers.Computadores.length; i++){
            if(computers.Computadores[i].id != id){
                newComputers.push(computers.Computadores[i])
            }
        }
        let CompJSON = {
            Computadores: newComputers
        }
        try{
            fs.writeFileSync(path.join(__dirname, '../db/Computadores.json'),JSON.stringify(CompJSON),function(err) {
                if (err) throw err;
                console.log('Computador Apagado');
            })
        }catch{
            status.isDeleted  = false
        }
        return status

    }


}
module.exports = new ComputadoresService()
function refreshbd(){
    blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
    salas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Salas.json'), 'utf8'))
    users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
    computers = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Computadores.json'), 'utf8'))
    reservas = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Reserva.json"), 'utf8'))
    horarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Horario.json"), 'utf8'))
}