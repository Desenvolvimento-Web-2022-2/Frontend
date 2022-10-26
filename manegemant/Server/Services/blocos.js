const blocos = require("../../public/Objects/Departaments.json")
class BlocoService{
    returnBlocosJson(){
        return blocos
    }
}
module.exports = new BlocoService()