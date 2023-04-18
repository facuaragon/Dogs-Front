const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true

    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value){
        this.setDataValue('name', value = value.toLowerCase().trim().split(' ').map( word => word[0].toUpperCase() + word.substr(1) ).join(' '))
      }
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdInDb : {
      type:  DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : true
     }
  },{
    timestamps: false
  });
};
