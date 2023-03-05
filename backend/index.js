import express, { json } from "express";
import cors from "cors";
import { crearUsuario, listarUsuarios } from "./mysql_connector.js";

//Iniciamos Express
const app = express();

//Habilitar cors
app.use(cors());
app.use(json());

//Iniciamos el servidor
app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});

app.get("/", function (req, res) {
    listarUsuarios(res)
});

//Crear usuario
app.post("/api/usuario", (req, res) => {
    const usuario = req.body;
    crearUsuario(usuario, res);
});
