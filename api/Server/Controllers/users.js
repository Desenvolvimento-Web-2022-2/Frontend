const usersService = require("../Services/users")

class UsersController{
  async getUsers(req, res){
    let json = usersService.returnUsersJson()
    res.status(200)
    res.send(json)
  }
  async getNewUser(req, res) {
    try{
      let json = usersService.updateUser()
      res.status(200)
      res.send(json)
    }catch(err){
      res.status(404)
      res.send("Not Found")
    }
  }
  async getUpdateUser(req, res) {
    try{
      let json = usersService.updateUser(req.params.userId)
      res.status(200)
      res.send(json)
    }catch(err){
      res.status(404)
      res.send("Not Found")
    }
  }
  async createUser(req, res) {
    let request = JSON.parse(req.body.req)
    let newUser = usersService.createUser(request)
    res.send(newUser)
  }
}
module.exports = new UsersController()