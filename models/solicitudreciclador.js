'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class SolicitudReciclador extends Model {
    static associate(models) {
    }
  }
  SolicitudReciclador.init({
    id_solicitud: DataTypes.INTEGER,
    id_reciclador: DataTypes.INTEGER,

    estado: DataTypes.ENUM("1","2","3","4"),

    precio_unitario_ofrecido: DataTypes.INTEGER,
    
    metodo_pago: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SolicitudReciclador',
  });
  return SolicitudReciclador;
};