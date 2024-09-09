const ruta = require("express").Router();

const {
    getTodosLosAdministradores,
} = require("../../controllers/admin/administrador.controller");
const { jwtMiddleware } = require("../../middlewares/auth/jwt.middleware");

const { roles } = require("../../utils/constants.utils");

const { ADMINISTRADOR } = roles;

ruta.get("/todos-los-administradores",
    jwtMiddleware([ADMINISTRADOR]),
    (req, res) => {
        getTodosLosAdministradores()
            .then((todosLosAdministradores) => {
                res.status(200).json(todosLosAdministradores);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).json({ mensaje: "La peticion fallo", error });
            });
    }
);

module.exports = {
    indice: "/administradores",
    ruta,
};