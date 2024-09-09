const { login } = require("../../controllers/auth/login.controller");

const ruta = require("express").Router();

ruta.post("/", (req, res) => {
    const { documento, clave } = req.body;
    login(documento, clave)
        .then((respuesta) => res.status(200).json({ 
            token: respuesta.token, 
            roles: respuesta.roles,
        }))
        .catch((error) => {
            res.json(error);
        });
});

module.exports = {
    indice: "/login",
    ruta,
};