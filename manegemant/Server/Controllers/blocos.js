const blocosService = require("../Services/blocos")

class BlocoController{
  async index(req, res){
    let json = blocosService.returnBlocosJson()
    res.render("Departamentos",{title:"Departamentos",baseUrl: req.baseUrl,JSONBloco:json,sidebarName:"Home"});
  }
  async departament(req, res){
    let jsonAndSalaName = blocosService.returnSalasJson(req.params.id)
    console.log(jsonAndSalaName)
    res.render("Salas",{title:"Salas",baseUrl: req.baseUrl,JSONSala:jsonAndSalaName.salas,sidebarName:jsonAndSalaName.name})
  }
}
module.exports = new BlocoController()