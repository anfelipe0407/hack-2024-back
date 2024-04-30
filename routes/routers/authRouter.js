import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import { Op } from "sequelize";

// MODELS
import MODELS from "../../models/index.js";

const { Usuario: UsuarioModel, RolesUsuario: RolesUsuarioModel, Rol: RolModel } = MODELS;

// Middlewares
// import { hasValidToken, testMid } from "../middlewares/AuthenticationMiddleware";
// router.use(hasValidToken);

// Helper functions
// import { validateEmail } from "../helperFunctions/validationHelperFunctions";

router.post("/", (req, res) => {
  res.status(200).send({
    message: "Conected to the server",
  });
});

router.post("/register", async (req, res) => {
  try {
    const data = req.body.data;

    console.log(data);

    const nuevo_usuario = await MODELS.Usuario.create(data);

    res.status(200).json({
      nuevo_usuario
    });

  } catch (error) {
    res.status(500).send({
      error
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = req.body.data;

    const check_sesion = await MODELS.Usuario.findAll({
      where: {
        [Op.and]: [{ correo: data?.correo }, { clave: data?.clave }],
      },
    });

    const logCorrecto = check_sesion.length > 0 ? true : false;

    res.status(200).json({
      logCorrecto,
      rol: check_sesion[0].rol,
      id_usuario: check_sesion[0].id
    });

  } catch (error) {
    res.status(500).send({
      error
    });
  }
});

export default router;
