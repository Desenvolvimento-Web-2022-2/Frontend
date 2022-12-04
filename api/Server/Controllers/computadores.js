const computadoresService = require("../Services/computadores")
const salasService = require("../Services/salas")

class ComputadoresController {
    getUpdateComputer(req, res){
        if(computadoresService.validateByBlocoAndSala(req.params.blocoId,req.params.salaId,req.params.computerId)){
            let json = computadoresService.returnComputer(req.params.computerId)
            res.status(200)
            res.send(JSON.stringify(json))
        }
        else{
            res.status(404)
            res.send("Not Found")
        }
            
    }
    getCreateComputer(req, res){
        let json = computadoresService.returnComputer()
        res.status(200)
        res.send(JSON.stringify(json))    
    }
    postComputer(req, res){
        let request = JSON.parse(req.body.req)
        let newComputador = computadoresService.post(request)
        res.status(200)
        res.send(JSON.stringify(newComputador))
    }
    async postUP(req,res){
        let request = JSON.parse(req.body.req)
        let newComputador = computadoresService.postAtt(request)
        res.status(200)
        res.send(JSON.stringify(newComputador))
      }
}
module.exports = new ComputadoresController()