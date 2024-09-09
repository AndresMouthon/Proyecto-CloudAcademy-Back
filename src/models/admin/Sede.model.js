const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/sequelize.config");
const { Rector } = require("./Rector.model");
const { Departamento } = require("./Departamento.model");
const { Ciudad } = require("./Ciudad.model");
const { Subdivision } = require("../localidad/Subdivision.model");

class Sede extends Model { };

Sede.init({
    codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    sede: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    abreviatura: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    identificacion_rector: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Rector,
            key: "identificacion_rector",
        },
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
    zona_id: {
        type: DataTypes.ENUM("URBANA", "RURAL"),
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
    modelName: "Sede",
    tableName: "sedes",
    timestamps: false
});

Rector.belongsTo(Sede, { foreignKey: 'identificacion_rector' });
Sede.hasOne(Rector, { foreignKey: 'identificacion_rector' });

Departamento.hasMany(Sede, { foreignKey: 'departamento_id' });
Sede.belongsTo(Departamento, { foreignKey: 'departamento_id' });

Ciudad.hasMany(Sede, { foreignKey: 'ciudad_id' });
Sede.belongsTo(Ciudad, { foreignKey: 'ciudad_id' });

Subdivision.hasMany(Sede, { foreignKey: 'subdivision_id' });
Sede.belongsTo(Subdivision, { foreignKey: 'subdivision_id' });

module.exports = { Sede };