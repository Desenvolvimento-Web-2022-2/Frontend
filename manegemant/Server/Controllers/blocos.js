const axios = require('axios').default;
const baseUrl = require("../../env.json").baseUrl

class BlocoController{
  async index(req, res){
      try{
        const response = await axios.get(baseUrl+"/getBlocos")
        const json = response.data
        res.status(200);
        res.render("Blocos",{title:"Departamentos",baseUrl: req.baseUrl,JSONBloco:json,sidebarName:"Home"});
      }catch(err){
        res.status(404);
        res.send('Not Found');
      }
  }
  async bloco(req, res){
    try{
      const reponse = await axios.get(baseUrl+"/getSalas/"+req.params.blocoId)
      const jsonAndBlocoName = reponse.data
      res.render("Salas",{title:"Salas",baseUrl: req.baseUrl,JSONSala:jsonAndBlocoName.salas,sidebarName:jsonAndBlocoName.name})
    }catch(err){
      res.status(404);
      res.send("Not Found")
    }
  }
  async getCreateBloco(req, res){
    try{
      const reponse = await axios.get(baseUrl+"/createBloco")
      const json = reponse.data
      res.render("AtualizarBloco",{title:"Criar Bloco",baseUrl: req.baseUrl,JSON:json,sidebarName:"Criar Bloco",render:"Criar Bloco"});
    }catch(err){
      res.status(404);
      res.send("Not Found")
    }
  }
  async getUpdateBloco(req, res){
    try{
      const reponse = await axios.get(baseUrl+"/updateBloco/"+req.params.blocoId)
      const json = reponse.data
      res.render("AtualizarBloco",{title:"Criar Bloco",baseUrl: req.baseUrl,JSON:json,sidebarName:"Criar Bloco",render:"Criar Bloco"});
    }catch(err){
      res.status(404);
      res.send("Not Found")
    }
  }
  async createBloco(req,res){
    try{
      let request = JSON.stringify(req.body)
      const reponse = await axios.post(baseUrl+"/createBloco",{
        req:request
      })
      res.status(201);
      res.send(reponse.data)
    }catch(err){
      console.error(err)
      res.status(404);
      res.send("Not Found")
    }
  }
  async updateBloco(req,res){
    try{
      let request = JSON.stringify(req.body)
      const reponse = await axios.put(baseUrl+"/updateBloco",{
        req:request
      })
      res.status(200);
      res.send(reponse.data)
    }catch(err){
      res.status(404);
      res.send("Not Found")
    }
  }
}
module.exports = new BlocoController()