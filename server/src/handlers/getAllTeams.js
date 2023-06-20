const getAllTeams = require('../controllers/teamsController');

const getTeams = async (req, res) => {
	try {
		const teams = await getAllTeams();
		res.json(teams);
	} catch (error) {
		console.error('Error al obtener los equipos:', error);
		res.status(500).json({ error: error.message });
	}
};
module.exports = getTeams;
