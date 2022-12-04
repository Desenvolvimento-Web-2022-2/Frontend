const blocos = require("../db/Blocos.json")
const salas = require("../db/Salas.json")

var fs = require('fs');
var path = require('path');

class BlocoService{
    returnBlocosJson(){
        return JSON.stringify(blocos)
    }
    returnSalasJson(blocoId){
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
        if(!blocoId)
            return JSON.stringify({name:"",subname:"",numberOrRole:"",id:""})
        else{
            let bloco = blocos.Blocos.find(bloco=> bloco.id == blocoId)
            return JSON.stringify(bloco)
        }
    }

    saveBloco(req){
        let newId = !!blocos.Blocos[blocos.Blocos.length-1] ? parseInt(blocos.Blocos[blocos.Blocos.length-1].id)+1 : 1
        let newBloco = {
            name: req.name,
            subname: req.subname,
            numberOrRole: req.numberOrRole,
            id:newId.toString()
        }
        blocos.Blocos.push(newBloco)
        fs.writeFileSync(path.join(__dirname, '../db/Blocos.json'),JSON.stringify(blocos),function(err) {
            if (err) throw err;
            return newBloco
        })
    }
    updateBloco(req){
        let upBloco = {
            name: req.name,
            subname: req.subname,
            numberOrRole: req.numberOrRole,
            id: req.blocoID
        }
        blocos.Blocos[req.blocoID - 1] = upBloco
        fs.writeFileSync(path.join(__dirname, '../db/Blocos.json'),JSON.stringify(blocos),function(err) {
            if (err) throw err;
            console.log('bloco atualizado');
            return upBloco
        })
    }
}
module.exports = new BlocoService()