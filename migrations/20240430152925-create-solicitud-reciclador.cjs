'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SolicitudRecicladores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      id_solicitud: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Solicitudes",
          key: "id",
        },
      },
      id_reciclador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },

      estado: {
        type: Sequelize.ENUM("1","2","3","4")
      },

      precio_unitario_ofrecido: {
        type: Sequelize.INTEGER
      },

      metodo_pago: {
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
    await queryInterface.dropTable('SolicitudRecicladores');
  }
};