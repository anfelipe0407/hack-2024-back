'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Solicitudes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      id_usuario_emisor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
      id_material: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Materiales",
          key: "id",
        },
      },

      codigo: {
        type: Sequelize.STRING
      },
      
      cantidad: {
        type: Sequelize.INTEGER
      },

      precio_unitario_esperado: {
        type: Sequelize.FLOAT
      },

      barrio: {
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Solicitudes');
  }
};