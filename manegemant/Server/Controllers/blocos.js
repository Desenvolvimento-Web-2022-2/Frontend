const blocosService = require("../Services/blocos")

class BlocoController{
  async index(req, res){
    let json = blocosService.returnBlocosJson()
    res.render("Departamentos",{title:"Departamentos",baseUrl: req.baseUrl,blocosInfos:json});
  }
  async departament(req, res){
    res.render("Salas",{title:"Departamentos",baseUrl: req.baseUrl})
  }
}
module.exports = new BlocoController()