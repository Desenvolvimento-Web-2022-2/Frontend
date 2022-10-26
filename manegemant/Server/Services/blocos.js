const blocos = require("../../public/Objects/Blocos.json")
const salas = require("../../public/Objects/Salas.json")

class BlocoService{
    returnBlocosJson(){
        return blocos
    }
    returnSalasJson(){
        console.log(salas)
        return salas
    }
}
module.exports = new BlocoService()