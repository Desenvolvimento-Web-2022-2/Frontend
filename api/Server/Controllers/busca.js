const buscaService = require("../Services/busca")


class BuscaController{
    async getSearch(req, res){
        let request = JSON.parse(req.body.req)
        console.log(request)
        let json
        switch(request.page){
            case "Blocos":
                json = buscaService.getBlocos(request)
                res.send(json)
                break
            case "Computadores":
                json = buscaService.getComputadores(request)
                break
            case "Users":
                json = buscaService.getUsers(request)
                break
            case "Salas":
                json = buscaService.getSalas(request)
                break
            default:
                res.status(404)
                res.send("Not Found")
                break
        } 
        res.json(json)
    }
}
module.exports = new BuscaController()