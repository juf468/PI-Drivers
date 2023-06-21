const axios = require('axios');
const { Op } = require('sequelize');
const { Driver, Team } = require('../db');

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const formatDriver = (driver) => {
	const defaultImageURL =
		'https://media.tenor.com/x3X71q4UOT8AAAAd/formula1-f1.gif';

	let formattedDriver = {};

	if (!driver.name.forename) {
		const formattedTeams = driver.Teams.map((team) => team.name).join(', ');

		formattedDriver = {
			id: driver.id,
			name: driver.name,
			surname: driver.surname,
			description: driver.description || '',
			nationality: driver.nationality,
			image: driver.image,
			teams: formattedTeams,
			date: driver.date,
			isFromApi: false,
		};
	} else {
		formattedDriver = {
			id: driver.id,
			name: driver.name.forename,
			surname: driver.name.surname,
			description: driver.description || '',
			nationality: driver.nationality,
			image: driver.image.url,
			teams: driver.teams,
			date: driver.dob,
			isFromApi: true,
		};
	}
	if (
		driver.image.url === '' ||
		driver.image.url ===
			'https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png'
	) {
		return {
			...formattedDriver,
			image: defaultImageURL,
		};
	}
	return formattedDriver;
};

const fetchDriversFromAPI = async (name) => {
	const petiApi = await axios.get(
		`http://localhost:5000/drivers?name.forename=${name}`
	);

	return petiApi.data;
};

const fetchDriversFromDB = async (name) => {
	const driversFromDB = await Driver.findAll({
		where: { name: { [Op.iLike]: `%${name}%` } },
		include: [
			{
				model: Team,
				attributes: ['name'],
				through: {
					attributes: [],
				},
			},
		],
	});

	if (driversFromDB.length) {
		return driversFromDB.map((driver) => driver.dataValues);
	}

	return [];
};

module.exports = {
	capitalize,
	formatDriver,
	fetchDriversFromAPI,
	fetchDriversFromDB,
};
