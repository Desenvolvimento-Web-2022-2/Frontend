const express = require('express')
const router = express.Router();

const blocoController = require("./Server/Controllers/blocos")
const usersController = require("./Server/Controllers/users")
const salaController = require("./Server/Controllers/salas")
const loginController = require("./Server/Controllers/login")
const ComputadoresController = require("./Server/Controllers/computadores")

// Blocos
router.get("/", blocoController.index)
router.get("/Bloco/:blocoId", blocoController.bloco)
router.get("/AtualizarBloco/:blocoId", blocoController.updateBloco)

//Users
router.get("/Usuarios",usersController.index)
router.get("/NovoUsuario",usersController.newUser)
router.get("/AtualizarUsuario/:userId",usersController.updateUser)

//Salas
router.get("/Bloco/:blocoId/Sala/:salaId/Computadores",salaController.getSala)
router.get("/Bloco/:blocoId/AtualizarSala/:salaId/", salaController.updateSala)

//Computadores
router.get("/Bloco/:blocoId/Sala/:salaId/AtualizarComputador/:computerId",ComputadoresController.updateComputer)

//Login
router.get("/Login",loginController.getLoginPage)

//Esqueci a senha
router.get("/RecSenha",loginController.getNewPassPage)

module.exports = router;