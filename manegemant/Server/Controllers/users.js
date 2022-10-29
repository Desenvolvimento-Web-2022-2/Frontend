const usersService = require("../Services/users")

class UsersController{
  async index(req, res){
    let json = usersService.returnUsersJson()
    res.render("Usuarios",{title:"Usuários",baseUrl: req.baseUrl,JSONUsers:json,sidebarName:"Usuários"});
  }
}
module.exports = new UsersController()