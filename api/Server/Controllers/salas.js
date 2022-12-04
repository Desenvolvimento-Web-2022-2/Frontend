const salasService = require("../Services/salas")

class SalaController {
  async getComputers(req, res) {
    if (salasService.validateByBloco(req.params.blocoId, req.params.salaId)) {
      let json = salasService.returnComputersJson(req.params.blocoId, req.params.salaId)
      res.status(200)
      res.send(json)
    }
    else{
      res.status(404)
      res.send("not found")
    }
  }
  async getUpdateSala(req, res) {
      if(salasService.validateByBloco(req.params.blocoId,req.params.salaId)){
        let json = salasService.returnSalaJson(req.params.salaId)
        res.status(200)
        res.send(json)
    }
    else{
      res.status(404)
      res.send("not found")
    }
  }
  async getCreateSala(req, res) {
    let json = salasService.returnSalaJson()
    res.status(200)
    res.send(json)
  }
  async createSala(req, res){
    let request = JSON.parse(req.body.req)
    let newSala = salasService.saveSala(request)
    if(!!newSala){
      res.status(200)
      res.send(JSON.stringify(newSala))
    }
    else{
      res.status(500)
      res.send("Server Error")
    }
  }
  async updateSala(req, res) {
    let request = JSON.parse(req.body.req)

    let attSala = salasService.updateSala(request)
    if(!!attSala){
      res.status(200)
      res.send(JSON.stringify(attSala))
    }
    else{
      res.status(500)
      res.send("Server Error")
    }
  }
  async deleteSala(req, res){
    let salaDel = salasService.deleteSala(req.params.salaId)
    if(salaDel==true){
      res.status(200)
      res.send("sala deletada!")
    }
    else{
      res.status(500)
      res.send("Server Error")
    }
  }

}
module.exports = new SalaController()