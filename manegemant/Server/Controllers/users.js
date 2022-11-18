const usersService = require("../Services/users")

class UsersController{
  async index(req, res){
    let json = usersService.returnUsersJson()
    res.render("Usuarios",{title:"Usuários",baseUrl: req.baseUrl,JSONUsers:json,sidebarName:"Usuários"});
  }
  async newUser(req, res){
    let json = usersService.updateUser()
    res.render("NovoUsuario",{title:"Novo usuário",baseUrl: req.baseUrl,JSON:json});
  }
  async updateUser(req, res){
    let json = usersService.updateUser(req.params.userId)
    res.render("NovoUsuario",{title:"Atualizar Usuário",baseUrl: req.baseUrl,JSON:json});
  }
  async post(req,res){
    let newUser = usersService.post(req)
    res.send(newUser)
  }
}
module.exports = new UsersController()