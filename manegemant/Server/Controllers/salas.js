const salasService = require("../Services/salas")
const baseUrl = require("../../env.json").baseUrl
const axios = require('axios').default;

class SalaController{
  async getSala(req, res){
    try{
      const response = await axios.get(baseUrl+"/getComputer/"+req.params.blocoId+"/"+req.params.salaId)
      if(response.status == 200){
        const json = response.data
        res.status(200);
        res.render("computadores",{title:"Computadores",baseUrl: req.baseUrl,ids:json.ids,JSONComputers:json.computadores,sidebarName:json.name});
      }
      else{
        res.status(404);
        res.send('Not Found');
      }
    }catch(err){
      console.error(err)
      res.status(404);
      res.send('Not Found');
    }
  }
  async getUpdateSala(req, res){
    try{
      const response = await axios.get(baseUrl+"/updateSala/"+req.params.blocoId+"/"+req.params.salaId)
      if(response.status == 200){
        const json = response.data
        res.status(200);
        res.render("AtualizarBloco",{title:"Computadores",baseUrl: req.baseUrl,JSON:json,sidebarName:"Atualizar Sala",render:"sala"});
      }
      else{
        res.status(404);
        res.send('Not Found');
      }
    }catch(err){
      console.error(err)
      res.status(404);
      res.send('Not Found');
    }
  }
  async getCreateSala(req, res){
    try{
      const response = await axios.get(baseUrl+"/createSala/"+req.params.blocoId)
      if(response.status == 200){
        const json = response.data
        res.status(200);
        res.render("AtualizarBloco",{title:"Criar Sala",baseUrl: req.baseUrl,JSON:json,sidebarName:"Criar Sala",render:"sala"});
      }
      else{
        res.status(404);
        res.send('Not Found');
      }
    }catch(err){
      console.error(err)
      res.status(404);
      res.send('Not Found');
    }

  }
  async createSala(req,res){
    try{
      let request = JSON.stringify(req.body)
      const reponse = await axios.post(baseUrl+"/createSala",{
        req:request
      })
      res.status(201);
      res.send(reponse.data)
    }catch(err){
      console.error(err)
      res.status(500);
      res.send("Internal Server Error")
    }
  }
  //TODO Levar para a API
  async updateSala(req,res){
    try{
      let request = JSON.stringify(req.body)
      const reponse = await axios.put(baseUrl+"/updateSala",{
        req:request
      })
      res.status(200);
      res.send(reponse.data)
    }catch(err){
      console.error(err)
      res.status(404);
      res.send("Internal Server Error")
    }
    let attSala = salasService.postAtt(req)
    res.send(attSala)
  }

  async deleteSala(req, res){
    try{
      const response = await axios.delete(baseUrl+"/deleteSala/"+req.params.salaId)
      if(response.status == 200){
        const json = response.data
        console.log(json)

        res.status(200)
        res.send(json)
        // res.render("salas",{title:"salas",baseUrl: req.baseUrl,ids:json.ids,JSONComputers:json.computers,sidebarName:json.name});
      }
      else{
        res.status(404)
        res.send('Not Found')
      }
    }catch(err){
      console.error(err)
      res.status(404)
      res.send('Not Found')
    }

  }

}
module.exports = new SalaController()