'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sedes', {
      codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      sede: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      abreviatura: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      direccion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      identificacion_rector: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departamento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ciudad_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      zona: {
        type: Sequelize.ENUM('Urbana', 'Rural'),
        allowNull: false,
      },
      subdivision_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      update_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    }, {
      timestamps: false,
      modelName: "Sedes",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sedes');
  }
};