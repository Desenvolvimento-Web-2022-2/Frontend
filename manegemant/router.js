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
router.get("/CriarBloco/", blocoController.getCreateBloco)
router.get("/Bloco/:blocoId/", blocoController.bloco)
router.get("/AtualizarBloco/:blocoId/", blocoController.getUpdateBloco)

router.post("/CriarBloco/", blocoController.createBloco)
router.put("/AtualizarBloco/:blocoId/", blocoController.updateBloco)
// router.post("/ExcluirBloco/:blocoId/", blocoController.postDEL)

//Users
router.get("/Usuarios",usersController.getUser)
router.get("/NovoUsuario",usersController.newUser)
router.get("/AtualizarUsuario/:userId",usersController.updateUser)
router.post("/NovoUsuario",usersController.createUser)

//Salas
router.get("/Bloco/:blocoId/Sala/:salaId/",salaController.getSala)
router.get("/Bloco/:blocoId/AtualizarSala/:salaId/", salaController.getUpdateSala)
router.get("/Bloco/:blocoId/CriarSala/", salaController.getCreateSala)

router.post("/Bloco/:blocoId/CriarSala/", salaController.createSala)
router.put("/Bloco/:blocoId/AtualizarSala/:salaId/", salaController.updateSala)
router.delete("/Bloco/:blocoId/ExcluiSala/:salaId/", salaController.deleteSala)
// router.post("/Bloco/:blocoId/ExcluiSala/:salaId", salaController.deleteSala) //fazer esse dps


//Computadores
router.get("/Bloco/:blocoId/Sala/:salaId/AtualizarComputador/:computerId",ComputadoresController.updateComputer)
router.get("/Bloco/:blocoId/Sala/:salaId/CriarComputador/",ComputadoresController.createComputer)
router.post("/Bloco/:blocoId/Sala/:salaId/AtualizarComputador/:computerId",ComputadoresController.postUP)
router.post("/Bloco/:blocoId/Sala/:salaId/CriarComputador/",ComputadoresController.post)
router.delete("/ExcluirComputador/:computerId", ComputadoresController.deleteComputer)


//Login
router.get("/Login",loginController.getLoginPage)
router.post("/authenticate",loginController.authenticate)
router.post("/validateToken",loginController.validateToken)

//Esqueci a senha
router.get("/RecSenha",loginController.getNewPassPage)

//Reserva
router.get("/Bloco/:blocoId/Sala/:salaId/calendar",ReservaController.getCalendar)
router.get("/getCalendar/:day/:mouth/:year",ReservaController.getReserva);
router.post("/reservarSala",ReservaController.criarReserva)

// router.get("/teste", (rec,resp)=>{resp.render('test', {baseUrl:rec.baseUrl, sidebarName:'abc', title:'teste'})})


//Busca
router.get("/Filtro/:tipo", BuscaController.retornaNomes)
router.post("/busca", BuscaController.getSearch)
module.exports = router;