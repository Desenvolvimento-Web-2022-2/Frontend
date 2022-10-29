const users = require("../../public/Objects/Users.json")

class UsersService{
    returnUsersJson(){
        return users
    }
}
module.exports = new UsersService()