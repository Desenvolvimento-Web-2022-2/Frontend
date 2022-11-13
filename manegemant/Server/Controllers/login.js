const loginService = require("../Services/login")

class LoginController{
  async getLoginPage(req, res){
    res.render("Login",{title:"Login",baseUrl: req.baseUrl});
  }
  async getNewPassPage(req, res){
    res.render("RecSenha", {title: "RecSenha", baseUrl: req.baseUrl})
  }
  async authenticate(req, res){
    let token = loginService.authenticate(req)
    res.json(token)
  }
  async validateToken(req,res){
    let token = loginService.validateToken(req.body.token)
    console.log(token)
    res.json(token)
  }
}
module.exports = new LoginController()