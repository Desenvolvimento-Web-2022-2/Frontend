const blocosService = require("../Services/blocos")

class BlocoController{
  async getBlocos(req, res){
    let json = blocosService.returnBlocosJson()
    res.status(200)
    res.send(json) 
  }
  async getSalas(req, res){
    const json = blocosService.returnSalasJson(req.params.blocoId)
    res.status(200)
    res.send(json)
  }
  async getCreateBloco(req, res){
    let json = blocosService.createOrUpdateBloco()
    res.status(200)
    res.send(json)
  }
  async getUpdateBloco(req, res){
    let json = blocosService.createOrUpdateBloco(req.params.blocoId)
    res.status(200)
    res.send(json)
  }
  async createBloco(req, res){
    let request = JSON.parse(req.body.req)
    let newBloco = blocosService.saveBloco(request)
    res.send(JSON.stringify(newBloco))
  }
  async updateBloco(req, res){
    let request = JSON.parse(req.body.req)
    let bloco = blocosService.updateBloco(request)
    res.send(JSON.stringify(bloco))
  }
  async deleteBloco(req, res){
    let response = blocosService.deleteBloco(req.params.blocoId)
    res.send(JSON.stringify(response))
  }
}
module.exports = new BlocoController()