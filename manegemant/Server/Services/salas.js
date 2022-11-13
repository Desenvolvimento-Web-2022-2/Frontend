const salas = require("../../public/Objects/Salas.json")
const computers = require("../../public/Objects/Computadores.json")
var fs = require('fs');
var path = require('path');

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
    post(req){
        let newId = !!salas.Salas[salas.Salas.length-1] ? parseInt(salas.Salas[salas.Salas.length-1].id)+1 : 1
        let newSala = {
            name: req.body.name,
            subname: req.body.subname,
            numberOrRole: req.body.numberOrRole,
            blocoId: req.body.blocoID,
            id:newId.toString()
        }
        
        salas.Salas.push(newSala)
        fs.writeFileSync(path.join(__dirname, '../../public/Objects/salas.json'),JSON.stringify(salas),function(err) {
            if (err) throw err;
            console.log('sala cadastrada');
            return newSala
        })
    }
    postAtt(req){
        let salaEdit
        for(let i = 0; i<salas.Salas.length; i++){
            if(salas.Salas.id == req.body.id) salaEdit = i
        }
        
    }
}
module.exports = new SalasService()