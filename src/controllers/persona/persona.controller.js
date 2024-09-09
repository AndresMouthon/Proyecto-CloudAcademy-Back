const { Ciudad } = require("../../models/localidad/Ciudad.model");
const { Departamento } = require("../../models/localidad/Departamento.model");
const { Persona } = require("../../models/persona/Persona.model");
const { TipoDocumento } = require("../../models/persona/TipoDocumento.model");
const { Subdivision } = require("../../models/localidad/Subdivision.model");
const { limpiarDatosSensibles } = require("../../middlewares/control-flujo-data");
const { generateCode, createPasswordPersona, formatNameCase, hashPassword } = require("../../utils/functions.util");
const sendVerificationEmail = require("../../services/email.service");

const getTodasLasPersonasVerificadas = async () => {
    const personas = await Persona.findAll({
        where: {
            verificado: 1
        },
        include: [
            {
                model: TipoDocumento,
                required: true,
                attributes: ["tipo_documento"],
            },
            {
                model: Departamento,
                required: true,
                attributes: ["departamento"],
            },
            {
                model: Ciudad,
                required: true,
                attributes: ["ciudad"],
            },
            {
                model: Subdivision,
                required: false,
                attributes: ["subdivision"],
            },
        ]
    });
    const camposLimpiar = [
        "clave",
        "codigo_verificacion",
        "update_at",
        "created_at",
    ];
    const personasLimpadas = limpiarDatosSensibles(personas, camposLimpiar);
    return personasLimpadas;
};

const getTodasLasPersonasSinVerificar = async () => {
    const personas = await Persona.findAll({
        where: {
            verificado: 0
        },
        include: [
            {
                model: TipoDocumento,
                required: true,
                attributes: ["tipo_documento"],
            },
            {
                model: Departamento,
                required: true,
                attributes: ["departamento"],
            },
            {
                model: Ciudad,
                required: true,
                attributes: ["ciudad"],
            },
            {
                model: Subdivision,
                required: false,
                attributes: ["subdivision"],
            },
        ]
    });
    const camposLimpiar = [
        "clave",
        "codigo_verificacion",
        "update_at",
        "created_at",
    ];
    const personasLimpadas = limpiarDatosSensibles(personas, camposLimpiar);
    return personasLimpadas;
};

const getPersonaPorDocumento = async (documento = "") => {
    const personaBuscar = await Persona.findOne({
        where: {
            documento,
        },
        include: [
            {
                model: TipoDocumento,
                required: true,
                attributes: ["tipo_documento"],
            },
            {
                model: Departamento,
                required: true,
                attributes: ["departamento"],
            },
            {
                model: Ciudad,
                required: true,
                attributes: ["ciudad"],
            },
            {
                model: Subdivision,
                required: false,
                attributes: ["subdivision"],
            },
        ]
    });
    if (!personaBuscar) return [];
    const camposLimpiar = [
        "clave",
        "codigo_verificacion",
        "update_at",
        "created_at",
        "departamento_id",
        "ciudad_id",
        "subdivision_id",
        "tipo_documento_id",
    ];
    const personaLimpia = limpiarDatosSensibles([personaBuscar], camposLimpiar);
    return personaLimpia;
};

const postCrearPersona = async (persona = {}) => {
    const { documento, nombres, apellidos, tipo_documento_id, perfil, genero, correo, contacto, fecha_nacimiento, edad, departamento_id, ciudad_id, zona, subdivision_id, direccion } = persona;
    const subdivisionIdValido = subdivision_id && Number(subdivision_id) !== 0 ? subdivision_id : null;
    const verificationCode = generateCode();
    const passwordCreate = createPasswordPersona(nombres, verificationCode);
    const nombreCaste = formatNameCase(nombres);
    const apellidosCaste = formatNameCase(apellidos);
    await Persona.create({ documento, nombres: nombreCaste, apellidos: apellidosCaste, tipo_documento_id, perfil, genero, correo, contacto, fecha_nacimiento, edad, codigo_verificacion: verificationCode, departamento_id, ciudad_id, zona, subdivision_id: subdivisionIdValido, direccion, clave: await hashPassword(passwordCreate) });
    await sendVerificationEmail(correo, verificationCode, passwordCreate);
    return "Persona creada";
};

const deleteEliminarPersona = async (documento = "") => {
    await Persona.destroy({ where: { documento } });
    return "Persona eliminada";
};

const putActualizarPersona = async (documentoActualizar = "", persona = {}) => {
    const { nombres, apellidos, tipo_documento_id, perfil, genero, correo, contacto, fecha_nacimiento, edad, departamento_id, ciudad_id, zona, subdivision_id, direccion } = persona;
    const subdivisionIdValido = subdivision_id && Number(subdivision_id) !== 0 ? subdivision_id : null;
    const nombreCaste = formatNameCase(nombres);
    const apellidosCaste = formatNameCase(apellidos);
    await Persona.update({ nombres: nombreCaste, apellidos: apellidosCaste, tipo_documento_id, perfil, genero, correo, contacto, fecha_nacimiento, edad, departamento_id, ciudad_id, zona, subdivision_id: subdivisionIdValido, direccion },
        { where: { documento: documentoActualizar } }
    );
    return "Persona actualizada";
};

const putActualizarCodigoVerificacion = async (documento = "", correo = "") => {
    const code = generateCode();
    await sendVerificationEmail(correo, code);
    await Persona.update({ codigo_verificacion: code }, { where: { documento } });
    return "Código actualizado";
};

module.exports = {
    getTodasLasPersonasVerificadas,
    getPersonaPorDocumento,
    postCrearPersona,
    getTodasLasPersonasSinVerificar,
    deleteEliminarPersona,
    putActualizarPersona,
    putActualizarCodigoVerificacion,
};