import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
// import { Op } from "sequelize";

// MODELS
import MODELS from "../../models/index.js";

router.post("/", (req, res) => {
  res.status(200).send({
    message: "Conected to the server",
  });
});

router.get("/materiales", async (req, res) => {
  try {
    const materiales = await MODELS.Material.findAll();

    res.status(200).json({
      materiales
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/solicitudes", async (req, res) => {
  try {
    const solicitudes = await MODELS.Solicitud.findAll();

    res.status(200).json({
      solicitudes
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/solicitud/nueva", async (req, res) => {
  try {
    const data = req.body.data;

    console.log(data);

    const nueva_solicitud = await MODELS.Solicitud.create(data);

    res.status(200).json({
      nueva_solicitud
    });

  } catch (error) {
    res.status(500).send({
      error
    });
  }
});

export default router;
