const { validationResult } = require("express-validator");

function validacionDeParametros(req, res, next) {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        res.json({
            errores: errores.array(),
        });
        return null;
    }

    next();
}

module.exports = { validacionDeParametros };