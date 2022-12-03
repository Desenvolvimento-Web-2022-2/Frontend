const salas = require("../db/salas.json")
const comps = require("../db/computadores.json")

var fs = require('fs');
var path = require('path');
class SalasService{
    returnComputersJson(blocoId, salaId){
        let validComputers = []
        comps.Computadores.forEach(comp => {
            if(comp.salaId == salaId)
                validComputers.push(comp)
        })
        let salaName = salas.Salas.find(sala=> sala.id == salaId)
        salaName = !!salaName ? salaName : {name:"",subname:"",numberOrRole:"",id:""}
        return JSON.stringify({
            computadores:validComputers,
            name:salaName.name,
            ids:{
                bloco:blocoId,
                sala:salaId,
            }
        })
    }
    validateByBloco(blocoId,salaId){
        let sala = this.returnSalaJson(salaId)
        return sala.blocoId == blocoId 
    }
    returnSalaJson(salaId=""){
        if(!salaId){
            return {name:"",subname:"",numberOrRole:"",id:"",blocoId:""}

        }
        let sala = salas.Salas.find(sala=> sala.id == salaId)

        return !!sala ? sala : {name:"",subname:"",numberOrRole:"",id:"",blocoId:""}
    }

    saveSala(req){
        let newId = !!salas.Salas[salas.Salas.length-1] ? parseInt(salas.Salas[salas.Salas.length-1].id)+1 : 1
        let newSala = {
            name: req.name,
            subname: req.subname,
            numberOrRole: req.numberOrRole,
            blocoId: req.blocoID,
            id:newId.toString()
        }
        
        salas.Salas.push(newSala)
        fs.writeFileSync(path.join(__dirname, '../db/salas.json'),JSON.stringify(salas),function(err) {
            if (err){ throw err;}
            console.log('sala cadastrada');
        })
        return newSala
    }
    updateSala(req){
        let attSala = {
            name: req.name,
            subname: req.subname,
            numberOrRole: req.numberOrRole,
            blocoId: req.blocoID,
            id: req.salaID
        }
        salas.Salas[req.salaID - 1] = attSala
        fs.writeFileSync(path.join(__dirname, '../db/salas.json'),JSON.stringify(salas),function(err) {
            if (err) throw err;
            console.log('sala atualizada');
        })
        return attSala

    }
}
module.exports = new SalasService()