const usersService = require("../Services/users")
const axios = require("axios").default
const baseUrl = require("../../env.json").baseUrl
class UsersController{
  async getUser(req, res){
    try{
      const response = await axios.get(baseUrl+"/getUsers")
      const json = response.data
      res.status(200);
      res.render("Usuarios",{title:"Usuários",baseUrl: req.baseUrl,JSONUsers:json,sidebarName:"Usuários"});
    }catch(err){
      res.status(404);
      res.send('Not Found');
    }
  }

  async newUser(req, res){
    try{
      const response = await axios.get(baseUrl+"/createUser")
      const json = response.data
      res.status(200);
      res.render("NovoUsuario",{title:"Novo usuário",baseUrl: req.baseUrl,JSON:json});
    }catch(err){
      res.status(404);
      res.send('Not Found');
    }
  }

  async updateUser(req, res){
    try{
      const response = await axios.get(baseUrl+"/updateUser/"+req.params.userId)
      const json = response.data
      res.status(200);
      res.render("NovoUsuario",{title:"Atualizar Usuário",baseUrl: req.baseUrl,JSON:json});
    }catch(err){
      res.status(404);
      res.send('Not Found');
    }
  }
  async createUser(req,res){
    try{
      let request = JSON.stringify(req.body)
      const reponse = await axios.post(baseUrl+"/createUser",{
        req:request
      })
      res.status(201);
      res.send(reponse.data)
    }catch(err){
      console.error(err)
      res.status(400);
      res.send("Bad Request")
    }
  }
}
module.exports = new UsersController()