const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Driver',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				// Cambiado de 'nombre' a 'name'
				type: DataTypes.STRING,
				allowNull: false,
			},
			surname: {
				// Cambiado de 'apellido' a 'surname'
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			nationality: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			createdInDb: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{ timestamps: false }
	);
};
