const express = require('express')
const router = express.Router();
const computers = require("../manegemant/public/Objects/Computadores.json")

const blocoController = require("./Server/Controllers/blocos")
const usersController = require("./Server/Controllers/users")
const salaController = require("./Server/Controllers/salas")
const loginController = require("./Server/Controllers/login")
const ComputadoresController = require("./Server/Controllers/computadores")
const ReservaController = require("./Server/Controllers/reserva")
const BuscaController = require("./Server/Controllers/busca")

// Blocos
router.get("/", blocoController.index)
router.get("/Bloco/:blocoId", blocoController.bloco)
router.get("/AtualizarBloco/:blocoId", blocoController.updateBloco)
router.post("/AtualizarBloco/:blocoId", blocoController.updateBloco)

//Users
router.get("/Usuarios",usersController.index)
router.get("/NovoUsuario",usersController.newUser)
router.get("/AtualizarUsuario/:userId",usersController.updateUser)
router.post("/NovoUsuario",usersController.post)

//Salas
router.get("/Bloco/:blocoId/Sala/:salaId/Computadores",salaController.getSala)
router.get("/Bloco/:blocoId/AtualizarSala/:salaId/", salaController.updateSala)
router.get("/Bloco/:blocoId/CriarSala/", salaController.createSala)
router.post("/Bloco/:blocoId/CriarSala/", salaController.post)

//Computadores
router.get("/Bloco/:blocoId/Sala/:salaId/AtualizarComputador/:computerId",ComputadoresController.updateComputer)

//Login
router.get("/Login",loginController.getLoginPage)
router.post("/authenticate",loginController.authenticate)

//Esqueci a senha
router.get("/RecSenha",loginController.getNewPassPage)

//Reserva
router.get("/Bloco/:blocoId/Sala/:salaId/calendar",ReservaController.getCalendar)
router.post("/reservarSala",ReservaController.criarReserva)
router.get("/getCalendar/:day/:mouth/:year",ReservaController.getReserva);

router.get("/teste", (rec,resp)=>{resp.render('test', {baseUrl:rec.baseUrl, sidebarName:'abc', title:'teste'})})
router.get("/Filtro/:tipo", BuscaController.retornaNomes)

module.exports = router;