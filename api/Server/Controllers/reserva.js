const reservaService = require("../Services/reserva")
const salasService = require("../Services/salas")

class ReservaController{
  async getCalendar(req,res){
    if (salasService.validateByBloco(req.params.blocoId, req.params.salaId)) {
      let json = salasService.returnComputersJson(req.params.blocoId,req.params.salaId)
      res.status(200)
      res.send(json)
    }
    else{
      res.status(404)
      res.send("Not Found")
    }
  }
  async getReserva(req, res){
    let date = `${req.params.year}-${req.params.mouth}-${req.params.day}`
    let json = reservaService.returnReservas(date)
    console.log(json)
    res.send(json);
  }
  async criarReserva(req, res){
    let request = JSON.parse(req.body.req)
    let resp = reservaService.criarReserva(request)
    res.send(resp)
  }
}
module.exports = new ReservaController()