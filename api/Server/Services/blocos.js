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
        fs.writeFileSync(path.join(__dirname, '../db/Blocos.json'),JSON.stringify(blocos),function(err) {
            if (err) throw err;
            console.log('bloco atualizado');
        })
        return upBloco
    }
    deleteBloco(id){
        refreshbd()
        let newBlocos = []
        let newComputers = []
        let newSalas = []
        let a = []
        for(let i=0; i<salas.Salas.length; i++){
            if(salas.Salas[i].blocoId == id){
                a.push(salas.Salas[i])
            }
            else{
                newSalas.push(salas.Salas[i])
            }
        }
        console.log(a)
        for(let j=0; j<computers.Computadores.length; j++){
            newSalas.forEach(sala=>{
                if(computers.Computadores[j].salaId == sala.id)
                    newComputers.push(computers.Computadores[j])
            })
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
function refreshbd(){
    blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
    salas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Salas.json'), 'utf8'))
    users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
    computers = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Computadores.json'), 'utf8'))
    reservas = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Reserva.json"), 'utf8'))
    horarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Horario.json"), 'utf8'))
}