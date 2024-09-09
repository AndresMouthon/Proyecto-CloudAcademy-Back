require("dotenv").config({ path: "./.env" });
require("./src/utils/functions.util").init();
require("./src/models/index.model");

const cors = require("cors");
const express = require("express");
const app = express();
const { sequelize } = require("./config/sequelize.config");
app.use(express.static('./public'));

// Llamado de las tablas para sincronizarlas
(async () => {
    try {
        await sequelize.sync({ alter: true });
    } catch (error) {
        console.log(error);
    }
})();
// Forzar la sincronización
// (async () => {
//     try {
//         await sequelize.sync({ force: true });
//         // console.log("MODELOS SINCRONIZADOS");
//     } catch (error) {
//         console.log(error);
//     }
// })();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
}));

app.use(express.json({ limit: "10mb" }));

const rutaPrincipal = express.Router();
const rutaLogin = require("./src/routers/auth/login.router");
const rutaAdministrador = require("./src/routers/admin/administrador.router");
const rutaPersona = require("./src/routers/persona/persona.router");
const rutaTipoDocumento = require("./src/routers/persona/tipo-documentos.router");
const rutaDepartamento = require("./src/routers/localidad/departamento.router");
const rutaCiudad = require("./src/routers/localidad/ciudad.router");
const rutaSubdivision = require("./src/routers/localidad/subdivision.router");

const { jwtVerifyTimeToken } = require("./src/utils/jwt.util");

app.get("/", function (req, res, next) {
    res.send("Hola mundo!");
});

rutaPrincipal.use(rutaLogin.indice, rutaLogin.ruta);
rutaPrincipal.use(rutaAdministrador.indice, rutaAdministrador.ruta);
rutaPrincipal.use(rutaPersona.indice, rutaPersona.ruta);
rutaPrincipal.use(rutaTipoDocumento.indice, rutaTipoDocumento.ruta);
rutaPrincipal.use(rutaDepartamento.indice, rutaDepartamento.ruta);
rutaPrincipal.use(rutaCiudad.indice, rutaCiudad.ruta);
rutaPrincipal.use(rutaSubdivision.indice, rutaSubdivision.ruta);

app.use(jwtVerifyTimeToken);
app.use("/api", rutaPrincipal);

app.listen(9001, () => {
    console.log('Servidor corriendo en el puerto 9001');
});