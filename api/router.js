const express = require('express')
const router = express.Router();

const BuscaController = require("./Server/Controllers/busca")
const BlocosController = require("./Server/Controllers/blocos")
const SalasController = require("./Server/Controllers/salas")
const ComputerController = require("./Server/Controllers/computadores")
const UsersController = require("./Server/Controllers/users")
const ReservController = require("./Server/Controllers/reserva")
const LoginController = require("./Server/Controllers/login")

//Blocos
router.get("/getBlocos", BlocosController.getBlocos)
router.get("/getSalas/:blocoId", BlocosController.getSalas)
router.get("/createBloco", BlocosController.getCreateBloco)
router.get("/updateBloco/:blocoId", BlocosController.getUpdateBloco)

router.post("/createBloco", BlocosController.createBloco)
router.put("/updateBloco", BlocosController.updateBloco)
router.delete("/deleteBloco/:blocoId", BlocosController.deleteBloco)

//Salas
router.get("/getComputer/:blocoId/:salaId", SalasController.getComputers)
router.get("/createSala/:blocoId/", SalasController.getCreateSala)
router.get("/updateSala/:blocoId/:salaId", SalasController.getUpdateSala)

router.post("/createSala", SalasController.createSala)
router.put("/updateSala", SalasController.updateSala)
router.delete("/deleteSala/:salaId", SalasController.deleteSala)

//Computadores
router.get("/:blocoId/:salaId/:computerId/attComputador", ComputerController.getUpdateComputer)
router.get("/createComputador/:salaId", ComputerController.getCreateComputer)
router.post("/postComputer", ComputerController.postComputer)
router.put("/putComputer",ComputerController.postUP)
router.delete("/deleteComputador/:computerId", ComputerController.deleteComputer)
// 
//Usuários 
router.get("/getUsers", UsersController.getUsers)
router.get("/createUser", UsersController.getNewUser)
router.get("/updateUser/:userId", UsersController.getUpdateUser)

router.post("/createUser",UsersController.createUser)
router.put("/updateUser", UsersController.updateUser)
router.delete("/deleteUser/:userId", UsersController.deleteUser)

//Reserva
router.get("/getCalendar/:blocoId/:salaId", ReservController.getCalendar)
router.get("/getReserva/:day/:mouth/:year", ReservController.getReserva)
router.post("/reservarSala",ReservController.criarReserva)

//Login
router.post("/authenticate", LoginController.authenticate)
router.post("/validateToken", LoginController.validateToken)
router.post("/postNewPassword",LoginController.postNewPassword)
//Busca
router.post("/getSearch", BuscaController.getSearch)
module.exports = router;