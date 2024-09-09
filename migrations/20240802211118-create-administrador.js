'use strict';

const { Persona } = require('../src/models/persona/Persona.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Administradores', {
      identificacion_administrador: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      codigo_rol: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Administradores');
  }
};