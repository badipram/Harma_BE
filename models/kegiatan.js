'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kegiatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kegiatan.init({
    id_kegiatan: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama_kegiatan: DataTypes.STRING,
    waktu_kegiatan: DataTypes.TIME,
    tanggal_kegiatan: DataTypes.DATEONLY,
    lokasi: DataTypes.STRING,
    detail: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Kegiatan',
  });
  return Kegiatan;
};