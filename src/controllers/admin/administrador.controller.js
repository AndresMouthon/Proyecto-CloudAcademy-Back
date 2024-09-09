const { Administrador } = require("../../models/admin/Administrador.model");
const { Persona } = require("../../models/persona/Persona.model");

const getTodosLosAdministradores = async () => {
    const administradores = await Administrador.findAll({
        include: [
            {
                model: Persona,
                required: true,
                attributes: [
                    "documento", 
                    "nombres", 
                    "apellidos", 
                    "fecha_nacimiento", 
                    "genero", 
                    "contacto", 
                    "correo", 
                    "perfil",
                ],
            },
        ]
    });
    return administradores;
};

module.exports = {
    getTodosLosAdministradores,
};