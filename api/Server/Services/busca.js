const blocos = require("../db/Blocos.json")
const salas = require("../db/Salas.json")
const computadores = require("../db/Computadores.json")
const users = require("../db/Users.json")
const profile = require("../db/Profiles.json")
class BuscaService{
    getComputadores(body){
        let computerArray = []
        if(body.input == ""){
            computadores.Computadores.forEach(computador=>{
                if(computador.salaId == body.ids.salaId)
                    computerArray.push(computador)
            })
        }
        else{
            computadores.Computadores.forEach(computador=>{
                if(
                    computador[`${body.select}`].toString().toLowerCase().includes(body.input.toLowerCase()) &&
                    computador.salaId == body.ids.salaId){
                        computerArray.push(computador)
                }
            })
        }
        return computerArray
    }
    getUsers(body){
        let usersArray = []
        if(body.input == ""){
            users.Users.forEach(user=>{
                delete user.usersInfosPassword
                profile.Profiles.forEach(p=>{
                    if(p.id == user.profileId){
                        delete user.profileId
                        user.profile = p
                    }
                })
                usersArray.push(user)
            })
        }
        else{
            users.Users.forEach(user=>{
                if(user[`${body.select}`].toString().toLowerCase().includes(body.input.toLowerCase())){
                    delete user.usersInfosPassword
                    profile.Profiles.forEach(p=>{
                        if(p.id == user.profileId){
                            delete user.profileId
                            user.profile = p
                        }
                    })
                    usersArray.push(user)
                }
            })
        }
        return usersArray
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
                if(bloco[`${body.select}`].toString().toLowerCase().includes(body.input.toLowerCase())){
                    blocosArray.push(bloco)
                }
            })
        }
        return blocosArray
    }
    getSalas(body){
        let salasArray = []
        if(body.input == ""){
            salas.Salas.forEach(sala=>{
                if( sala.blocoId == body.ids.blocoId)
                    salasArray.push(sala)
            })
        }
        else{
            salas.Salas.forEach(sala=>{
                if(
                    sala[`${body.select}`].toString().toLowerCase().includes(body.input.toLowerCase()) && 
                    sala.blocoId == body.ids.blocoId){
                    salasArray.push(sala)
                }
            })
        }
        return salasArray
    }
}
module.exports = new BuscaService()