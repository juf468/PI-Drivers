const putAllTeamsOnDb = require('../controllers/teamControllerDb');

const putTeamsOnDb = async (res) => {
	try {
		const teams = await putAllTeamsOnDb();
		res.status(200).json(teams);
	} catch (error) {
		console.error('Error al obtener los equipos:', error);
		res.status(500).json({ error: 'Error al obtener los equipos' });
	}
};
module.exports = putTeamsOnDb;
