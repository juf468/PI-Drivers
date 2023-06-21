const axios = require('axios');
const { Driver, Team } = require('../db');
const {
	formatDriver,
	capitalize,
	fetchDriversFromAPI,
	fetchDriversFromDB,
} = require('../utils');

const getAllDrivers = async () => {
	const petiApi = await axios.get('http://localhost:5000/drivers');
	const allDriversFromApi = petiApi.data.map((data) => ({
		...data,
		isFromApi: true,
	}));

	const allDriversFromDB = await Driver.findAll({
		include: {
			model: Team,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});

	const allDrivers = [...allDriversFromApi, ...allDriversFromDB];

	let formattedDrivers = allDrivers.map((driver) => {
		return formatDriver(driver);
	});

	return formattedDrivers;
};

const getDriverByName = async (name) => {
	const formattedName = capitalize(name);

	const driversFromApi = await fetchDriversFromAPI(formattedName);
	const driversFromDB = await fetchDriversFromDB(formattedName);

	const foundDrivers = [...driversFromApi, ...driversFromDB];

	const formattedDrivers = foundDrivers.map((driver) => formatDriver(driver));

	return formattedDrivers;
};

const getDriversById = async (id) => {
	try {
		const petiApi = await axios.get(`http://localhost:5000/drivers/${id}`);
		let driverFromApi = petiApi.data;

		return formatDriver(driverFromApi);
	} catch {
		const driverFromDB = await Driver.findOne({
			where: { id: id },
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

		return formatDriver(driverFromDB);
	}
};

const postDriver = async (newDriver) => {
	try {
		const driver = await Driver.create({
			name: newDriver.name,
			surname: newDriver.surname,
			description: newDriver.description,
			nationality: newDriver.nationality,
			image: newDriver.image,
			date: newDriver.date,
		});

		const teamsArray = newDriver.team.split(',');

		teamsArray.forEach(async (t) => {
			const team = await Team.findOne({
				where: { name: t },
			});

			if (team) {
				await driver.setTeams(team);
			}
		});

		const driverWithTeam = await Driver.findOne({
			where: { id: driver.id },
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

		const teams = driverWithTeam.Teams.map((team) => team.name).join(', ');
		return { ...driverWithTeam.dataValues, Teams: teams };
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};
module.exports = {
	getAllDrivers,
	getDriverByName,
	getDriversById,
	postDriver,
};
