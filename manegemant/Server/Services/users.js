const users = require("../../public/Objects/Users.json")
const profiles = require("../../public/Objects/Profiles.json")
class UsersService{
    returnUsersJson(){
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
}
module.exports = new UsersService()