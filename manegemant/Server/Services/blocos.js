const blocos = require("../../public/Objects/Blocos.json")
const salas = require("../../public/Objects/Salas.json")

class BlocoService{
    returnBlocosJson(){
        return blocos
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