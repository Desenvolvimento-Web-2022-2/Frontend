const computadoresService = require("../Services/computadores")

class ComputadoresController {
    async updateComputer(req, res) {
        if(computadoresService.validateByBlocoAndSala(req.params.blocoId,req.params.salaId,req.params.computerId)){
            let json = computadoresService.returnComputer(req.params.computerId)
            res.render("AtualizarComputador", { title: "Atualizar computador", baseUrl: req.baseUrl, JSON: json,sidebarName: "Atualizar computador"});
        }
        else
            res.send("URL inválida")
    }
    async createComputer(req, res) {
        let json = computadoresService.returnComputer(req.params.computerId)
        res.render("AtualizarComputador", { title: "Criar computador", baseUrl: req.baseUrl, JSON: json,sidebarName: "Criar computador"});
    }
    async post(req,res){
        let newComputador = computadoresService.post(req)
        res.send(newComputador)
    }
}
module.exports = new ComputadoresController()