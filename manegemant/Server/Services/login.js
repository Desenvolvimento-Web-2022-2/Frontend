const users = require("../../public/Objects/users.json")
const profile = require("../../public/Objects/Profiles.json")
const env = require("../../env.json")
var Crypto = require("crypto-js");

class LoginService{
    authenticate(req){
        let token = {
            token:"",
            status:"invalid",
            userId:""
        }

        let userReq = req.body
        let passwordDecode
        let user = users.Users.find(user=> user.usersInfosEmail == userReq.email)
        if(!!user){
            passwordDecode = Crypto.AES.decrypt(user.usersInfosPassword, env.userKey,{
                keySize: 128/8,
                iv:Crypto.enc.Utf8.parse(env.userIv),
                padding:Crypto.pad.Pkcs7,
                mode:Crypto.mode.CBC
              }).toString(Crypto.enc.Utf8)


              if(passwordDecode == userReq.password){
                let profileToEncrypt = profile.Profiles.find(profile=> profile.id == user.profileId)
                token.token = Crypto.AES.encrypt(profileToEncrypt.name,env.userKey,{
                    keySize: 128/8,
                    iv:Crypto.enc.Utf8.parse(env.userIv),
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
        let tokenDecrypted = Crypto.AES.decrypt(token, env.userKey,{
            keySize: 128/8,
            iv:Crypto.enc.Utf8.parse(env.userIv),
            padding:Crypto.pad.Pkcs7,
            mode:Crypto.mode.CBC
          }).toString(Crypto.enc.Utf8)
          let profileFinder = profile.Profiles.find(profile=> profile.name == tokenDecrypted)
        return !!profileFinder ? profileFinder.name : "Invalid Token"

    }

}
module.exports = new LoginService()