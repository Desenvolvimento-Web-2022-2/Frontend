const blocos = require("../db/Blocos.json")
const salas = require("../db/Salas.json")
const comps = require("../db/computadores.json")


var fs = require('fs');
var path = require('path');
const { deleteBloco } = require("../Controllers/blocos");

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
    deleteBloco(id){
        let newBlocos = []
        let newComputers = []
        let newSalas = []
        for(let i=0; i<salas.Salas.length; i++){
            if(salas.Salas[i].blocoId == id){
                let salaId = salas.Salas[i].salaId
                for(let j=0; j<comps.Computadores.length; j++){  
                    let aux = newComputers.find(item => item.id == comps.Computadores.id)      
                    if(comps.Computadores[j].salaId != salaId && !aux == true){
                        newComputers.push(comps.Computadores[j])
                    }
                }
            }else newSalas.push(salas.Salas[i])
        }
        for(let k=0; k<blocos.Blocos.length; k++){
            if(blocos.Blocos[k].id != id) newBlocos.push(blocos.Blocos[k])
        }
        let CompJSON = {
            Computadores: newComputers
        }
        let SalasJSON = {
            Salas: newSalas
        }
        let BlocosJSON = {
            Blocos: newBlocos
        }
        try{
            fs.writeFileSync(path.join(__dirname, '../db/Computadores.json'),JSON.stringify(CompJSON),function(err) {
                if (err) throw err
            })
            try{
                fs.writeFileSync(path.join(__dirname, '../db/Salas.json'),JSON.stringify(SalasJSON),function(err) {
                    if (err) throw err
                })
                try{
                    fs.writeFileSync(path.join(__dirname, '../db/Blocos.json'),JSON.stringify(BlocosJSON),function(err) {
                        if (err) throw err
                    })
                    return true
                }catch{
                    return false
                }
            }catch{
                return false
            }
        }catch{
            return false
        }

    }
}
module.exports = new BlocoService()