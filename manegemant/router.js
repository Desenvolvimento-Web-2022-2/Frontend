const express = require('express')
const router = express.Router();
const blocoController = require("./Server/Controllers/blocos")

// Blocos
router.get("/", blocoController.index)
router.get("/departamento/:id", blocoController.departament)


module.exports = router;