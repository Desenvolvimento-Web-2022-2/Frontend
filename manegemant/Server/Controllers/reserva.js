const reservaService = require("../Services/reserva")
const salasService = require("../Services/salas")

class ReservaController{
  async getCalendar(req,res){
    let json = salasService.returnComputersJson(req,req.params.salaId)
    res.render("calendar",{title: "calendar", baseUrl: req.baseUrl,sidebarName:json.name})
  }

  async getReserva(req, res){
    let date = `${req.params.year}-${req.params.mouth}-${req.params.day}`
    let json = reservaService.returnReservas(date)
    res.json(json);
  }
  async criarReserva(req, res){
    let resp = reservaService.criarReserva(req.body)
    res.send(resp)
  }
}
module.exports = new ReservaController()