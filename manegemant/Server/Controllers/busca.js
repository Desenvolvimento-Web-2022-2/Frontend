const buscaService = require("../Services/busca")

class BuscaController{
    async retornaNomes(req, res){
        let a = buscaService.retornaParametros(req.params.tipo)
        res.json(a)
    }
}
module.exports = new BuscaController()