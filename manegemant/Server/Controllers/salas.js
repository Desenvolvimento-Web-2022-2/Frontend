const salasService = require("../Services/salas")

class SalaController{
  async getSala(req, res){
    if(salasService.validateByBloco(req.params.blocoId,req.params.salaId)){
      let json = salasService.returnComputersJson(req,req.params.salaId)
      res.render("Computadores",{title:"Computadores",baseUrl: req.baseUrl,ids:json.ids,JSONComputers:json.computers,sidebarName:json.name});
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
}
module.exports = new SalaController()