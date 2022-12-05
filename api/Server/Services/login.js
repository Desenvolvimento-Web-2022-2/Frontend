// const users = require("../db/Users.json")

const profile = require("../db/Profiles.json")
const env = require("../../env.json")
var Crypto = require("crypto-js");
var fs = require('fs');
var path = require('path');
let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
class LoginService{
    authenticate(req){
        let token = {
            token:"",
            status:"invalid",
            userId:""
        }
        let data = Math.round(new Date().getTime() / 1000) + 3600

        let passwordDecode
        let user = users.Users.find(user=> user.usersInfosEmail == req.email)
        if(!!user){
            passwordDecode = Crypto.AES.decrypt(user.usersInfosPassword, env.userKey,{
                keySize: 128/8,
                iv:Crypto.enc.Utf8.parse(env.userIv),
                padding:Crypto.pad.Pkcs7,
                mode:Crypto.mode.CBC
              }).toString(Crypto.enc.Utf8)

              if(passwordDecode == req.password){
                let profileToEncrypt = profile.Profiles.find(profile=> profile.id == user.profileId)
                const objToEncrypt = JSON.stringify({"name":profileToEncrypt.name,"expires":data})
                token.token = Crypto.AES.encrypt(objToEncrypt,env.authKey,{
                    keySize: 128/8,
                    iv:Crypto.enc.Utf8.parse(env.authIv),
                    padding:Crypto.pad.Pkcs7,
                    mode:Crypto.mode.CBC
                  }).toString()
                token.name = user.usersInfosName
                token.status = "valid"
                token.userId = user.userId
                token.img = !!user.img ? user.img : "Not Found"
                return token
            }
        }

        return token
    }
    validateToken(token){
        let date = Math.round(new Date().getTime() / 1000)
        let tokenDecrypted = Crypto.AES.decrypt(token, env.authKey,{
            keySize: 128/8,
            iv:Crypto.enc.Utf8.parse(env.authIv),
            padding:Crypto.pad.Pkcs7,
            mode:Crypto.mode.CBC
          }).toString(Crypto.enc.Utf8)
        const json = JSON.parse(tokenDecrypted)
        let profileFinder = profile.Profiles.find(profile=> profile.name == json.name)
        return (!!profileFinder && (json.expires >= date)) ? profileFinder.name : "Invalid Token"

    }
    postNewPassword(req){
        let user = users.Users.find(user => user.usersInfosEmail == req.email)
        if(!!user){
            let newPasswordEnc = Crypto.AES.encrypt(req.password,env.userKey,{
                keySize: 128/8,
                iv:Crypto.enc.Utf8.parse(env.userIv),
                padding:Crypto.pad.Pkcs7,
                mode:Crypto.mode.CBC
              }).toString()
            user.usersInfosPassword = newPasswordEnc
            users.Users[user.userId - 1] = user
            fs.writeFileSync(path.join(__dirname, '../db/Users.json'),JSON.stringify(users),function(err) {
                if (err) throw err;
            })
            users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/Users.json"), 'utf8'))
            return {status:201,msg:"Created"}

        }
        else{
            return {status:400,msg:"Bad Request"}
        }
    }
}
module.exports = new LoginService()