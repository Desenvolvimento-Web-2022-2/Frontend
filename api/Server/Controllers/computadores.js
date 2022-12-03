const computadoresService = require("../Services/computadores")
const salasService = require("../Services/salas")

class ComputadoresController {
    getUpdateComputer(req, res){
        if(computadoresService.validateByBlocoAndSala(req.params.blocoId,req.params.salaId,req.params.computerId)){
            let json = computadoresService.returnComputer(req.params.computerId)
            
            res.status(200)
            res.send(json)
        }
        else{
            res.status(404)
            res.send("Not Found")
        }
            
    }
    getCreateComputer(req, res){
        let json = salasService.returnComputersJson()
        res.status(200)
        res.send(json)    
    }
}
module.exports = new ComputadoresController()