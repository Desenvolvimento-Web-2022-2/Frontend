const computadoresService = require("../Services/computadores")
const axios = require("axios").default
const baseUrl = require("../../env.json").baseUrl
class ComputadoresController {
    async index(req, res){
        try{
            const response = await axios.get(baseUrl+"/getComputer/"+req.params.blocoId+"/"+req.params.salaId)
            const json = response.data
            res.status(200);
            res.render("computadores",{title:"Computadores",baseUrl: req.baseUrl,ids:json.ids,JSONComputers:json.computers,sidebarName:json.name});
        }catch(err){
            res.status(404);
            res.send('Not Found');
        }
      }

    async updateComputer(req, res) {
        try{
            const response = await axios.get(baseUrl+"/"+req.params.blocoId+"/"+req.params.salaId+"/"+req.params.computerId+"/attComputador")
            if(response.status == 200){
              const json = response.data
              res.status(200);
              res.render("AtualizarComputador", { title: "Atualizar computador", baseUrl: req.baseUrl, JSON: json,sidebarName: "Atualizar computador",render:"Atualizar computador"});
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
    async createComputer(req, res){
        try{
            const response = await axios.get(baseUrl+"/createComputador/"+req.params.salaId)
            if(response.status == 200){
              const json = response.data
              console.log(json)

              res.status(200);
              res.render("AtualizarComputador",{title:"Criar Computador",baseUrl: req.baseUrl,JSON:json,sidebarName:"Criar Computador",render:"computador"});
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
    async deleteComputer(req, res){
      try{
        const response = await axios.delete(baseUrl+"/deleteComputador/"+req.params.computerId)
        if(response.status == 200){
          const json = response.data
          res.status(200)
          res.send(json)
        }
        else{
          res.status(404)
          res.send('Not Found')
        }
      }catch(err){
        console.error(err)
        res.status(500)
        res.send('Internal Server Error')
      }
    }
    async post(req,res){
      try{
        let request = JSON.stringify(req.body)
        const reponse = await axios.post(baseUrl+"/postComputer",{
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
    async postUP(req,res){
      try{
        let request = JSON.stringify(req.body)
        const reponse = await axios.put(baseUrl+"/putComputer",{
          req:request
        })
        res.status(200);
        res.send(reponse.data)
      }catch(err){
        console.error(err)
        res.status(404);
        res.send("Not Found")
      }
        let newComputador = computadoresService.postAtt(req)
        res.send(newComputador)
    }
}
module.exports = new ComputadoresController()