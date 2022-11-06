const loginService = require("../Services/login")

class LoginController{
  async getLoginPage(req, res){
    res.render("Login",{title:"Login",baseUrl: req.baseUrl});
  }
  async getNewPassPage(req, res){
    res.render("RecSenha", {title: "RecSenha", baseUrl: req.baseUrl})
  }
  async authenticate(req, res){

  }
}
module.exports = new LoginController()