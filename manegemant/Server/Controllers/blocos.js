const blocosService = require("../Services/blocos")

class BlocoController{
  async index(req, res){
    let json = blocosService.returnBlocosJson()
    res.render("Blocos",{title:"Departamentos",baseUrl: req.baseUrl,JSONBloco:json,sidebarName:"Home"});
  }
  async bloco(req, res){
    let jsonAndBlocoName = blocosService.returnSalasJson(req.params.blocoId)
    res.render("Salas",{title:"Salas",baseUrl: req.baseUrl,JSONSala:jsonAndBlocoName.salas,sidebarName:jsonAndBlocoName.name})
  }
  async updateBloco(req, res){
    let json = blocosService.returnBlocosJson(req.params.blocoId)
    res.render("AtualizarBloco",{title:"Atualizar Bloco",baseUrl: req.baseUrl,JSON:json,sidebarName:"Atualizar Bloco",render:"bloco"})
  }
  async createBloco(req, res){
    let json = blocosService.returnBlocosJson()
    res.render("AtualizarBloco",{title:"Criar Bloco",baseUrl: req.baseUrl,JSON:json,sidebarName:"Criar Bloco",render:"bloco"});
  }
  async post(req,res){
    let newBloco = blocosService.post(req)
    res.send(newBloco)
  }
}
module.exports = new BlocoController()