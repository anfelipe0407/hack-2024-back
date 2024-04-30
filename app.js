// balbalo 99 miamorrrriloviuuuuuu
import express from "express";

import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from 'url';

// * Routers
import authRouter from "./routes/routers/authRouter.js";

import vendedorRouter from "./routes/routers/vendedorRouter.js";

// ! Middlewares
// import { hasValidToken } from "./middlewares/AuthenticationMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// ! USE
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ! PORT AND LISTEN
const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);

app.listen(port, () => console.log("Server listening on port 8000"));

// ! ROUTERS
app.use("/", authRouter);
app.use("/vendedor", vendedorRouter);
// app.use("/docente", docenteRouter);

// app.use("/user-sesion", userSesionRouter);


export default app;