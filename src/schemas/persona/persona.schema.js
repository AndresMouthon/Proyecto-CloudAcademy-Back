const { param, body } = require("express-validator");

const validarBodyPersona = [
    body("documento")
        .exists()
        .withMessage("El documento es requerido")
        .isInt()
        .withMessage("El documento debe ser un numero entero")
        .isLength({ min: 10 })
        .withMessage("El documento debe ser de 10 digitos"),
    body("nombres")
        .exists()
        .withMessage("El nombre es requerido")
        .isString()
        .withMessage("El nombre debe ser de tipo texto")
        .isLength({ min: 3 })
        .withMessage("El nombre debe tener al menos 3 caracteres")
        .isLength({ max: 50 })
        .withMessage("El nombre debe tener como maximo 50 caracteres"),
    body("apellidos")
        .exists()
        .withMessage("El apellido es requerido")
        .isString()
        .withMessage("El apellido debe ser de tipo texto")
        .isLength({ min: 3 })
        .withMessage("El apellido debe tener al menos 3 caracteres")
        .isLength({ max: 50 })
        .withMessage("El apellido debe tener como maximo 50 caracteres"),
    body("tipo_documento_id")
        .exists()
        .withMessage("El tipo de documento es requerido")
        .isInt()
        .withMessage("El tipo de documento debe ser de tipo entero")
        .isLength({ min: 1 })
        .withMessage("El tipo de documento debe ser de al menos 1 digito")
        .isLength({ max: 3 })
        .withMessage("El tipo de documento debe ser de maximo 3 digitos"),
    body("genero")
        .exists()
        .withMessage("El genero es requerido")
        .isIn(["Masculino", "Femenino"])
        .withMessage("La opción de género no se encuentra en el sistema"),
    body("correo")
        .exists()
        .withMessage("El correo es requerido")
        .isEmail()
        .withMessage("El correo debe ser de tipo email"),
    body("contacto")
        .exists()
        .withMessage("El contacto es requerido")
        .isInt()
        .withMessage("El contacto debe ser de tipo entero")
        .isLength({ min: 10 })
        .withMessage("El contacto debe ser de al menos 10 digitos"),
    body("fecha_nacimiento")
        .exists()
        .withMessage("La fecha de nacimiento es requerida"),
    body("edad")
        .exists()
        .withMessage("La edad es requerida")
        .isInt()
        .withMessage("La edad debe ser de tipo entero")
        .isLength({ min: 1 })
        .withMessage("La edad debe ser de al menos 1 digito")
        .isLength({ max: 3 })
        .withMessage("La edad debe ser de maximo 3 digitos"),
    body("departamento_id")
        .exists()
        .withMessage("El departamento es requerido")
        .isInt()
        .withMessage("El departamento debe ser de tipo entero")
        .isLength({ min: 1 }),
    body("ciudad_id")
        .exists()
        .withMessage("La ciudad es requerida")
        .isInt()
        .withMessage("La ciudad debe ser de tipo entero")
        .isLength({ min: 1 }),
    body("zona")
        .exists()
        .withMessage("La zona es requerida")
        .isIn(["Urbana", "Rural"])
        .withMessage("La zona no se encuentra en el sistema"),
    body("subdivision_id")
        .if(body("zona").equals("Rural"))
        .exists()
        .withMessage("La subdivisión es requerida")
        .isInt()
        .withMessage("La subdivisión debe ser de tipo entero")
        .isLength({ min: 1 })
        .withMessage("La subdivisión debe tener al menos un carácter"),
    body("direccion")
        .exists()
        .withMessage("La direccion es requerida"),
];

module.exports = { validarBodyPersona };