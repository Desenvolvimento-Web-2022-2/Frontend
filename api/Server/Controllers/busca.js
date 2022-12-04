const buscaService = require("../Services/busca")


class BuscaController{
    async getSearch(req, res){
        try{
            let request = JSON.parse(req.body.req)
            let json
            switch(request.page){
                case "Blocos":
                    json = buscaService.getBlocos(request)
                    res.send(json)
                    break
                case "Computadores":
                    json = buscaService.getComputadores(request)
                    res.send(json)
                    break
                case "Users":
                    json = buscaService.getUsers(request)
                    res.send(json)
                    break
                case "Salas":
                    json = buscaService.getSalas(request)
                    res.send(json)
                    break
                default:
                    res.status(404)
                    res.send("Not Found")
                    break
            } 
        }catch(err){
            console.log(err)
            res.status(500)
            res.send("Internal Server Error")
        }
        
    }
}
module.exports = new BuscaController()