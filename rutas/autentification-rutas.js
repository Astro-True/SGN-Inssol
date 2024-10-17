const express = require("express");
const router = express.Router();

const {
    iniciarSecion
} = require("../controladores/autenticacion-controler");

router.post("/login", iniciarSecion);

module.exports = router;
