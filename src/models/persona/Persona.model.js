const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/sequelize.config");
const { Departamento } = require("../localidad/Departamento.model");
const { TipoDocumento } = require("./TipoDocumento.model");
const { Ciudad } = require("../localidad/Ciudad.model");
const { Subdivision } = require("../localidad/Subdivision.model");

class Persona extends Model { };

Persona.init({
    documento: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_documento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoDocumento,
            key: "id",
        },
    },
    perfil: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    genero: {
        type: DataTypes.ENUM('Masculino', 'Femenino'),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contacto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_nacimiento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('Activo', 'Inactivo'),
        allowNull: false,
        defaultValue: "Inactivo",
    },
    verificado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: Sequelize.literal("false"),
    },
    codigo_verificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    departamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Departamento,
            key: "id",
        },
    },
    ciudad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ciudad,
            key: "id",
        },
    },
    zona: {
        type: DataTypes.ENUM('Urbana', 'Rural'),
        allowNull: false,
    },
    subdivision_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Subdivision,
            key: "id",
        },
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    update_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Persona",
    tableName: "personas",
    timestamps: false,
});

// Relaciones
// Persona - TipoDocumento
TipoDocumento.hasMany(Persona, { foreignKey: 'tipo_documento_id' });
Persona.belongsTo(TipoDocumento, { foreignKey: 'tipo_documento_id' });

// Persona - Departamento
Departamento.hasMany(Persona, { foreignKey: 'departamento_id' });
Persona.belongsTo(Departamento, { foreignKey: 'departamento_id' });

// Persona - Ciudad
Ciudad.hasMany(Persona, { foreignKey: 'ciudad_id' });
Persona.belongsTo(Ciudad, { foreignKey: 'ciudad_id' });

// Persona - Subdivision
Subdivision.hasMany(Persona, { foreignKey: 'subdivision_id' });
Persona.belongsTo(Subdivision, { foreignKey: 'subdivision_id' });

module.exports = { Persona };