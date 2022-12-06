var fs = require('fs');
var path = require('path');

let blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
let salas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Salas.json'), 'utf8'))
let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
let computers = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Computadores.json'), 'utf8'))
let reservas = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Reserva.json"), 'utf8'))
let horarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Horario.json"), 'utf8'))

class SalasService{
    returnComputersJson(blocoId, salaId){
        refreshbd()
        let validComputers = []
        computers.Computadores.forEach(comp => {
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
        refreshbd()
        let sala = this.returnSalaJson(salaId)
        return sala.blocoId == blocoId 
    }
    returnSalaJson(salaId=""){
        refreshbd()
        if(!salaId){
            return {name:"",subname:"",numberOrRole:"",id:"",blocoId:""}

        }
        let sala = salas.Salas.find(sala=> sala.id == salaId)

        return !!sala ? sala : {name:"",subname:"",numberOrRole:"",id:"",blocoId:""}
    }

    saveSala(req){
        refreshbd()
        let newId = !!salas.Salas[salas.Salas.length-1] ? parseInt(salas.Salas[salas.Salas.length-1].id)+1 : 1
        let newSala = {
            name: req.name,
            subname: req.subname,
            numberOrRole: req.numberOrRole,
            blocoId: req.blocoID,
            img: req.img,
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
        refreshbd()
        let attSala = {
            name: req.name,
            subname: req.subname,
            numberOrRole: req.numberOrRole,
            blocoId: req.blocoID,
            id: req.salaID
        }
        for(let j=0; j<salas.Salas.length; j++){
            if(salas.Salas[j].id == attSala.id){
                attSala.img = !!req.img ? req.img : salas.Salas[j].img
                salas.Salas[j] = attSala
            }
        }
        fs.writeFileSync(path.join(__dirname, '../db/Salas.json'),JSON.stringify(salas),function(err) {
            if (err) throw err;
            console.log('sala atualizada');
        })
        return attSala

    }
    deleteSala(id){
        refreshbd()
        let newComputers = []
        let newSalas = []
        for(let i=0; i<computers.Computadores.length; i++){
            if(computers.Computadores[i].salaId != id){
                newComputers.push(computers.Computadores[i])
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
function refreshbd(){
    blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
    salas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Salas.json'), 'utf8'))
    users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
    computers = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Computadores.json'), 'utf8'))
    reservas = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Reserva.json"), 'utf8'))
    horarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Horario.json"), 'utf8'))
}