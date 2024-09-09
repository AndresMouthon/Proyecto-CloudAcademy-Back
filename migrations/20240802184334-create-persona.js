'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Personas', {
      documento: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      nombres: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellidos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_documento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      perfil: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      genero: {
        type: Sequelize.ENUM('Masculino', 'Femenino'),
        allowNull: false,
      },
      correo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contacto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_nacimiento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      edad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      estado: {
        type: Sequelize.ENUM('Activo', 'Inactivo'),
        allowNull: false,
        defaultValue: 'Inactivo',
      },
      verificado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: Sequelize.literal("false"),
      },
      codigo_verificacion: {
        type: Sequelize.INTEGER,
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
      direccion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      clave: {
        type: Sequelize.STRING,
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
    }, {
      timestamps: false,
      modelName: "Personas",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Personas');
  }
};