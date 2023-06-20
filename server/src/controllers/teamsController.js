const axios = require('axios');
const { Team } = require('../db');

const getAllTeams = async () => {
	const teams = await Team.findAll();
	return teams.map((team) => team.name);
};

module.exports = getAllTeams;
