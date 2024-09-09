const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/sequelize.config");
const { Persona } = require("../persona/Persona.model");
const { Rol } = require("./Rol.model");

class Docente extends Model { };

Docente.init({
    identificacion_docente: {
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
    modelName: "Docente",
    tableName: "docentes",
    timestamps: false,
});

// Relaciones
// Rector - Persona
Persona.hasOne(Docente, { foreignKey: 'identificacion_docente' });
Docente.belongsTo(Persona, { foreignKey: 'identificacion_docente' });

//Rector - Rol
Rol.hasOne(Docente, { foreignKey: 'codigo_rol' });
Docente.belongsTo(Rol, { foreignKey: 'codigo_rol' });

module.exports = { Docente };