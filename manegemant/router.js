const express = require('express')
const router = express.Router();
const blocoController = require("./Server/Controllers/blocos")
const usersController = require("./Server/Controllers/users")
const salaController = require("./Server/Controllers/salas")
const loginController = require("./Server/Controllers/login")

// Blocos
router.get("/", blocoController.index)
router.get("/departamento/:blocoId", blocoController.departament)
router.get("/updateDep/:blocoId", blocoController.updateBloco)

//Users
router.get("/users",usersController.index)
router.get("/newUser",usersController.newUser)
router.get("/updateUser/:id",usersController.updateUser)

//Salas
router.get("/departamento/:depId/sala/:salaId/computers",salaController.getSala)

//Login
router.get("/login",loginController.getLoginPage)

//Esqueci a senha
router.get("/RecSenha",loginController.getNewPassPage)

module.exports = router;