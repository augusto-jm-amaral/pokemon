'use strict'

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('pokemon', {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        min: {
          args: [0],
          msg: "Must be a non-negative number"
        }
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        min: {
          args: [0],
          msg: "Must be a non-negative number"
        }
      }
  })
}