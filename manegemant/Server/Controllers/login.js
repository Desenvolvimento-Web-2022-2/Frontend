const loginService = require("../Services/login")
const axios = require('axios').default;
const baseUrl = require("../../env.json").baseUrl

class LoginController{
  async getLoginPage(req, res){
    res.render("Login",{title:"Login",baseUrl: req.baseUrl});
  }
  async getNewPassPage(req, res){
    res.render("RecSenha", {title: "RecSenha", baseUrl: req.baseUrl})
  }

  async authenticate(req, res){
    try{
      let request = JSON.stringify(req.body)
      console.log(request)
      const reponse = await axios.post(baseUrl+"/authenticate",{
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
  async validateToken(req,res){
    try{
      let request = JSON.stringify(req.body)
      console.log(request)
      const reponse = await axios.post(baseUrl+"/validateToken",{
        req:request
      })
      res.status(201);
      res.send(reponse.data)
    }catch(err){
      console.error(err)
      res.status(401);
      res.send("Unauthorized")
    }
  }
}
module.exports = new LoginController()