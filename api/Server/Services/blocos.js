// const blocos = require("../db/Blocos.json")
// const salas = require("../db/Salas.json")
var fs = require('fs');
var path = require('path');

let blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
let salas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Salas.json'), 'utf8'))
let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
let computers = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Computadores.json'), 'utf8'))
let reservas = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Reserva.json"), 'utf8'))
let horarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Horario.json"), 'utf8'))

class BlocoService{
    returnBlocosJson(){
        refreshbd()
        return JSON.stringify(blocos)
    }
    returnSalasJson(blocoId){
        refreshbd()
        salas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Salas.json'), 'utf8'))
        let validSalas = []
        salas.Salas.forEach(sala => {
            console.log(sala)
            if(sala.blocoId == blocoId)
                validSalas.push(sala)
        })
        let blocoName = blocos.Blocos.find(bloco=> bloco.id == blocoId)
        blocoName = !!blocoName ? blocoName : {name:"",subname:"",numberOrRole:"",id:""}

        return JSON.stringify({
            salas:validSalas,
            name:blocoName.name
        })
    }

    createOrUpdateBloco(blocoId=""){
        refreshbd()
        if(!blocoId)
            return JSON.stringify({name:"",subname:"",numberOrRole:"",id:""})
        else{
            let bloco = blocos.Blocos.find(bloco=> bloco.id == blocoId)
            return JSON.stringify(bloco)
        }
    }

    saveBloco(req){
        refreshbd()
        blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
        let newId = !!blocos.Blocos[blocos.Blocos.length-1] ? parseInt(blocos.Blocos[blocos.Blocos.length-1].id)+1 : 1
        let newBloco = {
            name: req.name,
            subname: req.subname,
            numberOrRole: req.numberOrRole,
            img:req.img,
            id:newId.toString()
        }
        blocos.Blocos.push(newBloco)
        fs.writeFileSync(path.join(__dirname, '../db/Blocos.json'),JSON.stringify(blocos),function(err) {
            if (err) throw err;
        })
        return newBloco
    }
    updateBloco(req){
        refreshbd()
        blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
        let upBloco = {
            name: req.name,
            subname: req.subname,
            numberOrRole: req.numberOrRole,
            id: req.blocoID
        }
        for(let j=0; j<blocos.Blocos.length; j++){
            if(blocos.Blocos[j].id == upBloco.id){
                upBloco.img = !!req.img ? req.img : blocos.Blocos[j].img
                blocos.Blocos[j] =upBloco
            }
        }
        // blocos.Blocos[req.blocoID - 1] = upBloco
        fs.writeFileSync(path.join(__dirname, '../db/Blocos.json'),JSON.stringify(blocos),function(err) {
            if (err) throw err;
            console.log('bloco atualizado');
        })
        return upBloco
    }
}
module.exports = new BlocoService()
function refreshbd(){
    blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
    salas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Salas.json'), 'utf8'))
    users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
    computers = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Computadores.json'), 'utf8'))
}