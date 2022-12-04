const buscaService = require("../Services/busca")
const baseUrl = require("../../env.json").baseUrl
const axios = require('axios').default;
class BuscaController{
    async retornaNomes(req, res){
        let a = buscaService.retornaParametros(req.params.tipo)
        res.json(a)
    }
    async getSearch(req, res){
        try{
            console.log(JSON.stringify(req.body))
            let request = JSON.stringify(req.body)
            const reponse = await axios.post(baseUrl+"/getSearch",{
              req:request
            })
            res.status(200);
            res.send(reponse.data)
          }catch(err){
            console.error(err)
            res.status(500);
            res.send("Internal Server Error")
          }
        // res.json(json)
    }
}
module.exports = new BuscaController()