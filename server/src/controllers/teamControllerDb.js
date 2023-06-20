const axios = require('axios');
const { Team } = require('../db');

const putAllTeamsOnDb = async () => {
	const dataApi = await axios.get('http://localhost:5000/drivers');
	const drivers = dataApi.data;
	const teams = drivers.map((driver) => {
		const splittedDrivers = driver.teams?.split(',') || [];
		return splittedDrivers;
	});

	const finalTeamsArray = teams
		.flat()
		.map((value) => value.trim())
		.filter((value, index, self) => {
			return self.indexOf(value) === index;
		})
		.sort();

	const teamsInDb = await Promise.all(
		finalTeamsArray.map((name) => Team.create({ name }))
	);

	return teamsInDb;
};

module.exports = putAllTeamsOnDb;
