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
  const data = req.body;
  // res.send(data);

  const dataCheck = await UsuarioModel.findAll({
    where: {
      num_documento: data?.num_documento,
    },
  });

  if (dataCheck.length > 0) {
    res.send({
      messageError: "No pueden existir dos usuario con la misma num_documento",
    });
    return;
  }

  let ERROR = "";
  if (data?.num_documento.toString().length > 10) {
    ERROR += "La num_documento no puede tener más de 10 dígitos";
  }

  // if (!validateEmail(data?.correo)) {
  //   ERROR += "El correo es invalido";
  // }

  data.usuario = `${data?.nombre.charAt(0)}${data?.p_apellido}${Math.floor(
    Math.random() * (9999 - 1000) + 1000
  )}`;

  const salt = bcrypt.genSaltSync(10); // data random para añadir seguridad
  const clave_sin_encriptar = Math.floor(
    Math.random() * (999999 - 100000) + 100000
  ).toString();

  data.clave = bcrypt.hashSync(clave_sin_encriptar, salt);
  data.clave_sin_encriptar = clave_sin_encriptar;

  try {
    if (ERROR.length > 0) {
      res.send({
        messageError: ERROR,
      });
    } else {
      const new_user = await UsuarioModel.create(data);
      res.status(200).send({ new_user, clave_sin_encriptar });
    }
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.post("/login", async (req, res) => {
  const data = req.body; //usuario, clave, id_rol

  // res.status(200).send(data);

  const [user, _] = await UsuarioModel.findAll({
    where: {
      usuario: data.usuario,
    },
  });

  const [rol, __] = await RolesUsuarioModel.findAll({
    where: {
      id: data.id_rol,
    },
  });

  // res.status(200).send({ user, rol });

  // * USUARIO NO EXISTE
  if (!user || !data.clave || !rol) {
    res.status(200).send({
      login: false,
      message: "Usuario o contraseña incorrectos",
    });

    return;
  }

  const rol_usuario_asoc = await RolesUsuarioModel.findAll({
    where: {
      [Op.and]: [{ id_rol: data.id_rol }, { id_usuario: user.id }],
    },
  });

  // res.status(200).send(rol_usuario_asoc);

  // * EL usuario no tiene el rol que se envio
  if (rol_usuario_asoc.length === 0) {
    res.status(200).send({
      login: false,
      message: "El usuario no cuenta con el rol indicado",
    });

    return;
  }

  let resultado = false;
  if (user && rol_usuario_asoc.length === 1) {
    // resultado = bcrypt.compareSync(data.clave, user?.clave);
    resultado = data?.clave === user?.clave;
  }

  if (resultado) {
    res.status(200).send({
      id_usuario: user.id,
      login: true,
    });
    return;
  } else {
    res.status(200).send({
      login: false,
      message: "Usuario o contraseña incorrectos",
    });
  }
});

export default router;
