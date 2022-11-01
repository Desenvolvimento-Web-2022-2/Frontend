const blocosService = require("../Services/blocos")

class BlocoController{
  async index(req, res){
    let json = blocosService.returnBlocosJson()
    res.render("Departamentos",{title:"Departamentos",baseUrl: req.baseUrl,JSONBloco:json,sidebarName:"Home"});
  }
  async departament(req, res){
    let jsonAndDepName = blocosService.returnSalasJson(req.params.blocoId)
    res.render("Salas",{title:"Salas",baseUrl: req.baseUrl,JSONSala:jsonAndDepName.salas,sidebarName:jsonAndDepName.name})
  }
  async updateBloco(req, res){
    let json = blocosService.returnBlocosJson(req.params.blocoId)
    res.render("Departamento-update",{title:"Atualizar Bloco",baseUrl: req.baseUrl,JSON:json,sidebarName:"Atualizar Bloco",render:"bloco"})
  }
}
module.exports = new BlocoController()