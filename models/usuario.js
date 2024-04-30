'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    clave: DataTypes.STRING,
    barrio: DataTypes.STRING,
    direccion: DataTypes.STRING,
    rol: DataTypes.ENUM("admin", "vendedor", "reciclador")
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};