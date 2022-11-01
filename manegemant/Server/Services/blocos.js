const blocos = require("../../public/Objects/Blocos.json")
const salas = require("../../public/Objects/Salas.json")

class BlocoService{
    returnBlocosJson(id=""){
        if(!id){
            return blocos
        }
        else{
            blocos.Blocos.find(bloco=> {console.log(bloco.id)})
            return blocos.Blocos.find(bloco=> bloco.id == id)
        }
    }
    returnSalasJson(id){
        let validSalas = []
        salas.Salas.forEach(sala => {
            if(sala.depId == id)
                validSalas.push(sala)
        })
        let blocoName = blocos.Blocos.find(bloco=> bloco.id == id)
        return {
            salas:validSalas,
            name:blocoName.name
        }
    }
}
module.exports = new BlocoService()