const salasService = require("../Services/salas")

class SalaController{
  async getSala(req, res){
    if(salasService.validateByBloco(req.params.blocoId,req.params.salaId)){
      let json = salasService.returnComputersJson(req,req.params.salaId)
      res.render("computadores",{title:"Computadores",baseUrl: req.baseUrl,ids:json.ids,JSONComputers:json.computers,sidebarName:json.name});
    }
    else
      res.send("URL inválida")
    
  }
  async updateSala(req, res){
    if(salasService.validateByBloco(req.params.blocoId,req.params.salaId)){
      let json = salasService.returnSalaJson(req.params.salaId)
      res.render("AtualizarBloco",{title:"Computadores",baseUrl: req.baseUrl,JSON:json,sidebarName:"Atualizar Sala",render:"sala"});
    }
    else{
      res.send("URL inválida")
    }
  }
  async createSala(req, res){
    let json = salasService.returnSalaJson(req.params.salaId)
    res.render("AtualizarBloco",{title:"Criar Sala",baseUrl: req.baseUrl,JSON:json,sidebarName:"Criar Sala",render:"sala"});
  }
  async post(req,res){
    let newSala = salasService.post(req)
    res.send(newSala)
  }
}
module.exports = new SalaController()