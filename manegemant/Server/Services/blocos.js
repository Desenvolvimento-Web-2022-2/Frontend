const blocos = require("../../public/Objects/Blocos.json")
const salas = require("../../public/Objects/Salas.json")
var fs = require('fs');
var path = require('path');


class BlocoService{
    returnBlocosJson(id=""){
        if(!id){
            return blocos
        }
        else{
            let bloco = blocos.Blocos.find(bloco=> bloco.id == id)
            bloco = !!bloco ? bloco : {name:"",subname:"",numberOrRole:"",id:""}
            return bloco
        }
    }
    returnSalasJson(id){
        let validSalas = []
        salas.Salas.forEach(sala => {
            if(sala.blocoId == id)
                validSalas.push(sala)
        })
        let blocoName = blocos.Blocos.find(bloco=> bloco.id == id)
        blocoName = !!blocoName ? blocoName : {name:"",subname:"",numberOrRole:"",id:""}
        return {
            salas:validSalas,
            name:blocoName.name
        }
    }
    post(req){
        let newId = !!blocos.Blocos[blocos.Blocos.length-1] ? parseInt(blocos.Blocos[blocos.Blocos.length-1].id)+1 : 1
        let newBloco = {
            name: req.body.name,
            subname: req.body.subname,
            numberOrRole: req.body.numberOrRole,
            id:newId.toString()
        }
        blocos.Blocos.push(newBloco)
        fs.writeFileSync(path.join(__dirname, '../../public/Objects/Blocos.json'),JSON.stringify(blocos),function(err) {
            if (err) throw err;
            console.log('bloco cadastrado');
            return newBloco
        })
    }
    postUp(req){
        let upBloco = {
            name: req.body.name,
            subname: req.body.subname,
            numberOrRole: req.body.numberOrRole,
            id: req.body.blocoID
        }
        console.log(upBloco)
        blocos.Blocos[req.body.blocoID - 1] = upBloco
        console.log(blocos.Blocos[req.body.blocoID - 1])
        fs.writeFileSync(path.join(__dirname, '../../public/Objects/Blocos.json'),JSON.stringify(blocos),function(err) {
            if (err) throw err;
            console.log('bloco atualizado');
            return upBloco
        })
    }
}
module.exports = new BlocoService()