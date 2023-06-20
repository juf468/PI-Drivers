const axios = require('axios');
const server = require('./src/server');
const { conn } = require('./src/db.js');
const { Team } = require('./src/db');
const putAllTeamsOnDb = require('./src/controllers/teamControllerDb');
const PORT = 3001;

const teamsInDb = async () => {
	const teams = await Team.findAll();

	if (teams.length === 0) {
		await putAllTeamsOnDb();
	}
};

conn
	.sync({ force: true })
	.then(() => {
		server.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
			teamsInDb();
		});
	})
	.catch((error) => console.error(error));
