'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Material.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    id_categoria: DataTypes.INTEGER,
    precio_unitario_sugerido: DataTypes.FLOAT,
    precio_unitario_promedio: DataTypes.FLOAT,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Material',
    tableName: 'Materiales',

  });
  return Material;
};