const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/sequelize.config");
const { Persona } = require("../persona/Persona.model");
const { Rol } = require("./Rol.model");

class Alumno extends Model { };

Alumno.init({
    identificacion_alumno: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Persona,
            key: "documento",
        },
    },
    codigo_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Rol,
            key: "id",
        }
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
    modelName: "Alumno",
    tableName: "alumnos",
    timestamps: false,
});

// Relaciones
// Rector - Persona
Persona.hasOne(Alumno, { foreignKey: 'identificacion_alumno' });
Alumno.belongsTo(Persona, { foreignKey: 'identificacion_alumno' });

// Rector - Rol
Rol.hasOne(Alumno, { foreignKey: 'codigo_rol' });
Alumno.belongsTo(Rol, { foreignKey: 'codigo_rol' });

module.exports = { Alumno };