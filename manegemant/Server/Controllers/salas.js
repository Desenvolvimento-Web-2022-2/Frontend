const salasService = require("../Services/salas")

class SalaController{
  async getSala(req, res){
    let json = salasService.returnComputersJson(req.params.salaId)
    json.computers.forEach(computer=> console.log(computer))
    res.render("Computadores",{title:"Computadores",baseUrl: req.baseUrl,JSONComputers:json.computers,sidebarName:json.name});
  }
}
module.exports = new SalaController()