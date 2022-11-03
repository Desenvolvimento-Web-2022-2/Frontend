const blocos = require("../../public/Objects/Blocos.json")
const salas = require("../../public/Objects/Salas.json")

class BlocoService{
    returnBlocosJson(id=""){
        if(!id){
            return blocos
        }
        else{
            let bloco = blocos.Blocos.find(bloco=> bloco.id == id)
            return !!bloco ? bloco : {name:"",subname:"",numberOrRole:"",id:""}
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
}
module.exports = new BlocoService()