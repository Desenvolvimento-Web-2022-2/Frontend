// const blocos = require("../db/Blocos.json")
// const salas = require("../db/Salas.json")
// const computadores = require("../db/Computadores.json")
// const users = require("../db/Users.json")
var fs = require('fs');
var path = require('path');
const profile = require("../db/Profiles.json")
let blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
let salas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Salas.json'), 'utf8'))
let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
let computers = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Computadores.json'), 'utf8'))
let reservas = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Reserva.json"), 'utf8'))
let horarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Horario.json"), 'utf8'))

class BuscaService{
    getComputadores(body){
        refreshbd()
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
        refreshbd()
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
        refreshbd()
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
        refreshbd()
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

function refreshbd(){
    blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
    salas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Salas.json'), 'utf8'))
    users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
    computers = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Computadores.json'), 'utf8'))
    reservas = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Reserva.json"), 'utf8'))
    horarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Horario.json"), 'utf8'))
}