const profiles = require("../db/Profiles.json")

const env = require("../../env.json")
var fs = require('fs');
var path = require('path');
var Crypto = require("crypto-js");

let blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
let salas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Salas.json'), 'utf8'))
let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
let computers = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Computadores.json'), 'utf8'))
let reservas = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Reserva.json"), 'utf8'))
let horarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Horario.json"), 'utf8'))
class UsersService {
    returnUsersJson() {
        refreshbd()
        let usersArray = []
        users.Users.forEach(user => {
            let userObj =
            {
                "usersInfosName": "",
                "usersInfosEmail": "",
                "usersInfosRole": "",
                "userId": "",
                "profileId": ""
            }
            Object.keys(userObj).forEach(key => {
                if (key != "usersInfosRole")
                    userObj[key] = user[key]
                else {
                    userObj[key] = profiles.Profiles.find(profile => profile.id == user["profileId"]).name
                }
            })
            usersArray.push(userObj)
        })
        return usersArray
    }
    updateUser(id = "") {
        refreshbd()
        let returnObj
        let userObj = this.returnUsersJson()
        userObj = userObj.forEach(user => {
            if (user.userId == id.toString()) {
                returnObj = user
            }
        })
        let userObj2 =
        {
            "usersInfosName": "",
            "usersInfosEmail": "",
            "usersInfosRole": "",
            "userId": "",
            "profileId": ""
        }
        return !!returnObj ? returnObj : userObj2
    }
    createUser(req) {
        refreshbd()
        let hash = Crypto.AES.encrypt(req.password, env.userKey, {
            keySize: 128 / 8,
            iv: Crypto.enc.Utf8.parse(env.userIv),
            padding: Crypto.pad.Pkcs7,
            mode: Crypto.mode.CBC
        }).toString()
        users.Users.forEach(user=>{
            if(user.usersInfosEmail == req.email)
                return "Erro"
        })
        let newUser = {
            usersInfosName: req.name,
            usersInfosEmail: req.email,
            usersInfosPassword: hash,
            img: req.img,
            userId: (parseInt(users.Users[users.Users.length - 1].userId) + 1).toString(),
            profileId: req.profileId,
            isActive: "true"
        }

        users.Users.push(newUser)
        fs.writeFileSync(path.join(__dirname, '../db/users.json'), JSON.stringify(users), function (err) {
            if (err) throw err;
            console.log('usuário cadastrado');
        })
        return newUser
    }
    updateUserPut(req) {
        refreshbd()
        let hash = Crypto.AES.encrypt(req.password, env.userKey, {
            keySize: 128 / 8,
            iv: Crypto.enc.Utf8.parse(env.userIv),
            padding: Crypto.pad.Pkcs7,
            mode: Crypto.mode.CBC
        }).toString()

        let upUser = {
            usersInfosName: req.name,
            usersInfosEmail: req.email,
            usersInfosPassword: hash,
            img: req.img,
            userId: req.userId,
            profileId: req.profileId,
            isActive: "true"
        }
        console.log(upUser)
        for (let j = 0; j < users.Users.length; j++) {
            if (users.Users[j].userId == upUser.userId) {
                users.Users[j] = upUser
            }
        }
        fs.writeFileSync(path.join(__dirname, '../db/users.json'), JSON.stringify(users), function (err) {
            if (err) throw err;
            console.log('usuário cadastrado');
            return newUser
        })
    }
    deleteUser(userId){
        let allUserReservas = reservas.Reserva.filter(r=> r.userId == userId)
        let allHorarios = []
        allUserReservas.forEach(r=>{
            allHorarios.push(horarios.Horario.find(h=>h.horarioId == r.horarioId))
        })
        let hAux = 0
        let hToJson = []

        for(let i=0;i<horarios.Horario.length;i++){
            if(hAux > allHorarios.length - 1){
                break
            }
            if(horarios.Horario[i].horarioId != allHorarios[hAux].horarioId){
                hToJson.push(horarios.Horario[i])
                console.log(horarios.Horario[i])

            }
            else{
                hAux++
            }
        }
        // throw new Error()
        let rAux = 0
        let rToJson = []
        for(let i=0;i<reservas.Reserva.length;i++){
            if(rAux > allUserReservas.length - 1){
                break
            }
            if(reservas.Reserva[i].reservId != allUserReservas[rAux].reservId){
                rToJson.push(reservas.Reserva[i])
            }
            else{
                rAux++
            }
        }
        let uToJson = []
        for(let j=0; j<users.Users.length; j++){
            if(users.Users[j].userId != userId){
                uToJson.push(users.Users[j])
            }
        }
        users.Users = uToJson
        reservas.Reserva = rToJson
        horarios.Horario = hToJson
        console.log(horarios)
        console.log(reservas)
        // console.log(users)

        fs.writeFileSync(path.join(__dirname, '../db/Horario.json'),JSON.stringify(horarios),function(err) {
            if (err) throw err;
            console.log('Horario atualizado');
        })
        fs.writeFileSync(path.join(__dirname, '../db/Reserva.json'),JSON.stringify(reservas),function(err) {
            if (err) throw err;
            console.log('Reserva atualizada');
        })
        fs.writeFileSync(path.join(__dirname, '../db/Users.json'),JSON.stringify(users),function(err) {
            if (err) throw err;
            console.log('Users atualizado');
        })
        return "ok"
    }
}
module.exports = new UsersService()


function refreshbd() {
    blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
    salas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Salas.json'), 'utf8'))
    users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
    computers = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Computadores.json'), 'utf8'))
    reservas = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Reserva.json"), 'utf8'))
    horarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Horario.json"), 'utf8'))
}