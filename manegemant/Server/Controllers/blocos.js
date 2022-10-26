const blocosService = require("../Services/blocos")

class BlocoController{
  async index(req, res){
    let json = blocosService.returnBlocosJson()
    res.render("Departamentos",{title:"Departamentos",baseUrl: req.baseUrl,JSONBloco:json});
  }
  async departament(req, res){
    let json = blocosService.returnSalasJson()
    console.log(json)
    res.render("Salas",{title:"Salas",baseUrl: req.baseUrl,JSONSala:json})
  }
}
module.exports = new BlocoController()