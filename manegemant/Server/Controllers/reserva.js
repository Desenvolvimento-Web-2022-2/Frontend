const reservaService = require("../Services/reserva")

class ReservaController{
  async getReserva(req, res){
    let date = `${req.params.year}-${req.params.mouth}-${req.params.day}`
      let json = reservaService.returnReservas(date)
      res.json(json);
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
module.exports = new ReservaController()