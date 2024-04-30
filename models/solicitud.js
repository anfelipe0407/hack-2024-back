'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Solicitud extends Model {
    static associate(models) {
      // this.hasOne(models.Material, {
      //     as: "material",
      //     foreingKey: "id_material"
      //   }
      // )
    }
  }
  Solicitud.init({
    id_usuario_emisor: DataTypes.INTEGER,
    id_material: DataTypes.INTEGER,
    codigo: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    precio_unitario_esperado: DataTypes.FLOAT,
    barrio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Solicitud',
    tableName: 'Solicitudes'
  });
  return Solicitud;
};