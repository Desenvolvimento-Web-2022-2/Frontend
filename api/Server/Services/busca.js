const blocos = require("../db/Blocos.json")

class BuscaService{
    getComputadores(body){
    }
    getUsers(body){
        
    }
    getBlocos(body){
        let blocosArray = []
        if(body.input == ""){
            blocos.Blocos.forEach(bloco=>{
                blocosArray.push(bloco)
            })
        }
        else{
            blocos.Blocos.forEach(bloco=>{
                if(bloco[`${body.select}`].toString().toLowerCase() == body.input.toLowerCase()){
                    blocosArray.push(bloco)
                }
            })
        }
        return blocosArray
    }
    getSalas(body){
        
    }
}
module.exports = new BuscaService()