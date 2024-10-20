// const express = require("express");
// const router = express.Router();

// const {
//     iniciarSecion
// } = require("../controladores/autenticacion-controler");

// router.post("/login", iniciarSecion);

// module.exports = router;
const express = require('express');
const { iniciarSesion, datos } = require('./../controladores/autenticacion-controler');
const router = express.Router();

router.post('/login', iniciarSesion); // Asegúrate de que esta línea esté correcta
router.get('/datos/:id', datos);

module.exports = router;
