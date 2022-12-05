const loginService = require("../Services/login")

class LoginController{
  async authenticate(req, res){
    let request = JSON.parse(req.body.req)
    let token = loginService.authenticate(request)
    if(token.status != "invalid"){
      res.status(201)
      res.send(JSON.stringify(token))
    }
    else{
      res.status(400);
      res.send("Bad Request")
    }
  }
  async validateToken(req,res){
    let request = JSON.parse(req.body.req)
    
    let token = loginService.validateToken(request.token)
    if(token != "Invalid Token"){
      res.status(200)
      res.send(JSON.stringify(token))
    }
    else{
      res.status(401);
      res.send("Unauthorized")
    }
  }
  async postNewPassword(req,res){
    let request = JSON.parse(req.body.req)
    console.log(request)
    let resp = loginService.postNewPassword(request)
    console.log(resp)
    if(resp.status ==201){
      res.status(201)
      res.send(JSON.stringify(resp))
    }
    else{
      res.status(400);
      res.send("Bad Request")
    }
  }
}
module.exports = new LoginController()