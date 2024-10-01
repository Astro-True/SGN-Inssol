const {
  datospersonalesLista,
  datosPersonalesCreate,
} = require("./../controladores/DatosPersonales-contoles");

const express = require("express");
const router = express.Router();

router.get("/", datospersonalesLista);
router.post("/", datosPersonalesCreate);

module.exports = router;
