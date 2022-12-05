// const users = require("../db/Users.json")

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
class UsersService{
    returnUsersJson(){
        refreshbd()
        let usersArray = []
        users.Users.forEach(user=>{
            let userObj = 
            {
                "usersInfosName": "",
                "usersInfosEmail": "",
                "usersInfosRole": "",
                "userId":"",
                "profileId":""
            }
            Object.keys(userObj).forEach(key=>{
                if(key != "usersInfosRole")
                    userObj[key] = user[key]
                else{
                    userObj[key] = profiles.Profiles.find(profile=>profile.id == user["profileId"]).name
                }
            })
            usersArray.push(userObj)
        })
        return usersArray
    }
    updateUser(id=""){
        refreshbd()
        let returnObj
        let userObj = this.returnUsersJson()
        userObj = userObj.forEach(user=>{
            if(user.userId == id.toString() ){
                returnObj = user
            }
        })
        let userObj2 = 
        {
            "usersInfosName": "",
            "usersInfosEmail": "",
            "usersInfosRole": "",
            "userId":"",
            "profileId":""
        }
        return !!returnObj ? returnObj :userObj2
    }
    createUser(req){
        refreshbd()
        let hash = Crypto.AES.encrypt(req.password,env.userKey,{
            keySize: 128/8,
            iv:Crypto.enc.Utf8.parse(env.userIv),
            padding:Crypto.pad.Pkcs7,
            mode:Crypto.mode.CBC
          }).toString()

          let newUser = {
            usersInfosName: req.name,
            usersInfosEmail: req.email,
            usersInfosPassword:hash,
            img:req.img,
            userId:(parseInt(users.Users[users.Users.length-1].userId)+1).toString(),
            profileId:req.profileId,
            isActive:"true"
          }
          
          users.Users.push(newUser)
          fs.writeFileSync(path.join(__dirname, '../db/users.json'),JSON.stringify(users),function(err) {
            if (err) throw err;
            console.log('usuário cadastrado');
            return newUser
        })
    }
}
module.exports = new UsersService()


function refreshbd(){
    blocos = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Blocos.json'), 'utf8'))
    salas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Salas.json'), 'utf8'))
    users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
    computers = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/Computadores.json'), 'utf8'))
    reservas = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Reserva.json"), 'utf8'))
    horarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Horario.json"), 'utf8'))
}