import express from "express";
const router = express.Router();
import { Op } from "sequelize";

// MODELS
import MODELS from "../models/index.js";
const { UserLog } = MODELS;

async function logUserAction(data) {
  const action = await UserLog.create(data);

  return action;
}

export { logUserAction };

