const blocosService = require("../Services/blocos")

class BlocoController{
  async index(req, res){
    let json = blocosService.returnBlocosJson()
    res.render("Departamentos",{title:"Departamentos",baseUrl: req.baseUrl,JSONBloco:json,sidebarName:"Home"});
  }
  async departament(req, res){
    let jsonAndDepName = blocosService.returnSalasJson(req.params.id)
    res.render("Salas",{title:"Salas",baseUrl: req.baseUrl,JSONSala:jsonAndDepName.salas,sidebarName:jsonAndDepName.name})
  }
}
module.exports = new BlocoController()