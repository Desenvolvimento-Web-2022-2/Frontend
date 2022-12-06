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
    if(newUser == "Erro"){
      res.status(400)
      res.send("User Alredy exist")
    }
    else{
      res.status(201)
      res.send(newUser)
    }
  }
  async updateUser(req, res) {
    let request = JSON.parse(req.body.req)
    let newUser = usersService.updateUserPut(request)
    res.send(newUser)
  }
  async deleteUser(req, res)  {
    let deleteUser = usersService.deleteUser(req.params.userId)
    if(!!deleteUser)
    res.send(deleteUser)
  }
}
module.exports = new UsersController()