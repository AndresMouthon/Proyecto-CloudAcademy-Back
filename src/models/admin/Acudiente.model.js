const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/sequelize.config");
const { Persona } = require("../persona/Persona.model");
const { Rol } = require("./Rol.model");

class Acudiente extends Model { };

Acudiente.init({
    identificacion_acudiente: {
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
    modelName: "Acudiente",
    tableName: "acudientes",
    timestamps: false,
});

// Relaciones
// Rector - Persona
Persona.hasOne(Acudiente, { foreignKey: 'identificacion_acudiente' });
Acudiente.belongsTo(Persona, { foreignKey: 'identificacion_acudiente' });

// Rector - Rol
Rol.hasOne(Acudiente, { foreignKey: 'codigo_rol' });
Acudiente.belongsTo(Rol, { foreignKey: 'codigo_rol' });

module.exports = { Acudiente };