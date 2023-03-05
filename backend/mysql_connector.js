import { createConnection } from "mysql";
import dotenv from "dotenv";

dotenv.config();

// Configuración de la conexión
const connection = createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWDB,
    database: process.env.DB,
});

//Conectar a la base
function conectar() {
    connection.connect((error) => {
        if (error) {
            throw error;
        }
        console.log("Conexión exitosa con la DB");
    });
}

function listarUsuarios(res) {
    const sql = `SELECT * FROM users`;
    connection.query(sql, function (error, result, fields) {
        if (error) {
            console.error(error);
            res.status(500).send("Error al listar usuarios");
        }
        console.log("Usuarios listados exitosamente");
        res.status(200).send(result);
    });
}

function crearUsuario(usuario, res) {
    const { nombre, email, phone } = usuario;
    const sql = `INSERT INTO users (name, email, phone) VALUES ("${nombre}", "${email}", "${phone}")`;
    connection.query(sql, function (error, result, fields) {
        if (error) {
            console.error(error);
            res.status(500).send("Error al crear un usuario");
        }
        console.log("Usuario creado exitosamente");
        res.status(201).send(usuario);
    });
}

export { conectar, listarUsuarios, crearUsuario };
