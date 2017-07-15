'use strict'

module.exports = (sequelize, DataTypes) => {
	return sequelize.define('pokemon', {
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				min: {
					args: [0],
					msg: "Must be a non-negative number"
				}
			}
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				min: {
					args: [0],
					msg: "Must be a non-negative number"
				}
			}
		}
	})
}