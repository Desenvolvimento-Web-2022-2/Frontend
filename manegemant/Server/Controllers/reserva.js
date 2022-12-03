const reservaService = require("../Services/reserva")
const salasService = require("../Services/salas")
const axios = require("axios").default
const baseUrl = require("../../env.json").baseUrl

class ReservaController{
  async getCalendar(req,res){
    try{
      const response = await axios.get(baseUrl+"/getCalendar/"+req.params.blocoId+"/"+req.params.salaId)
      const json = response.data
      if(response.status == 200){
        res.status(200);
        res.render("calendar",{title: "calendar", baseUrl: req.baseUrl,sidebarName:json.name})
      }
      else{
        res.status(404);
        res.send('Not Found');
      }
    }catch(err){
      res.status(404);
      res.send('Not Found');
    }
  }

  async getReserva(req, res){
    try{
    const response = await axios.get(baseUrl+"/getReserva/"+req.params.day+"/"+req.params.mouth+"/"+req.params.year)
    const json = response.data
    if(response.status == 200){
      res.status(200);
      res.json(json);
    }
    else{
      res.status(404);
      res.send('Not Found');
    }
  }catch(err){
      res.status(404);
      res.send('Not Found');
    }
  }
  async criarReserva(req, res){
    try{
      let request = JSON.stringify(req.body)
      const reponse = await axios.post(baseUrl+"/reservarSala",{
        req:request
      })
      res.status(201);
      res.send(reponse.data)
    }catch(err){
      console.error(err)
      res.status(500);
      res.send("Internal Server Error")
    }
    // let resp = reservaService.criarReserva(req.body)
    // res.send(resp)
  }
}
module.exports = new ReservaController()