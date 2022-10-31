const express = require('express')
const router = express.Router();
const blocoController = require("./Server/Controllers/blocos")
const usersController = require("./Server/Controllers/users")
const salaController = require("./Server/Controllers/salas")

// Blocos
router.get("/", blocoController.index)
router.get("/departamento/:id", blocoController.departament)

//Users
router.get("/users",usersController.index)
router.get("/newUser",usersController.newUser)
router.get("/updateUser/:id",usersController.updateUser)

//Salas
router.get("/departamento/:depId/sala/:salaId/computers",salaController.getSala)


module.exports = router;