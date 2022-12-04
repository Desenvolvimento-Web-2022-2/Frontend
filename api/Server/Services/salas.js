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
    deleteSala(id){
        let newComputers = []
        let newSalas = []
        for(let i=0; i<comps.Computadores.length; i++){
            console.log(comps.Computadores[i].salaId,id)

            if(comps.Computadores[i].salaId != id){
                newComputers.push(comps.Computadores[i])
            }
        }
        for(let j=0; j<salas.Salas.length; j++){
            if(salas.Salas[j].id != id) newSalas.push(salas.Salas[j])
        }
        let CompJSON = {
            Computadores: newComputers
        }
        let SalasJSON = {
            Salas: newSalas
        }
        try{
            fs.writeFileSync(path.join(__dirname, '../db/Computadores.json'),JSON.stringify(CompJSON),function(err) {
                if (err) throw err
            })
            try{
                fs.writeFileSync(path.join(__dirname, '../db/Salas.json'),JSON.stringify(SalasJSON),function(err) {
                    if (err) throw err
                })
                return true
            }catch{
                return false
            }
        }catch{
            return false
        }


        

    }
}
module.exports = new SalasService()