const ruta = require("express").Router();
const { roles } = require("../../utils/constants.utils");
const { ADMINISTRADOR, RECTOR } = roles;
const { getTodosLosDepartamentos } = require("../../controllers/localidad/departamento.controller");
const { jwtMiddleware } = require("../../middlewares/auth/jwt.middleware");


ruta.get("/todos-los-departamentos",
    jwtMiddleware([ADMINISTRADOR, RECTOR]),
    (req, res) => {
        getTodosLosDepartamentos()
            .then((todosLosDepartamentos) => {
                res.status(200).json(todosLosDepartamentos);
            })
            .catch((error) => {
                res.status(400).json({ mensaje: "La peticion fallo", error });
            });
    }
);

module.exports = {
    indice: "/departamentos",
    ruta,
}