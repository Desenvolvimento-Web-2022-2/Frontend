const users = require("../db/Users.json")
const profile = require("../db/Profiles.json")
const env = require("../../env.json")
var Crypto = require("crypto-js");

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
                token.name = JSON.stringify(user)
                token.status = "valid"
                token.userId = user.userId
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

}
module.exports = new LoginService()