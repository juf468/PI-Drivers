const { postDriver } = require('../controllers/DriverController');

const toPostDriver = async (req, res) => {
	try {
		const { name, surname, description, nationality, image, team, date } =
			req.body;
		const newDriver = await postDriver({
			name,
			surname,
			description,
			nationality,
			image,
			team,
			date,
		});
		res.status(200).json(newDriver);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};
module.exports = toPostDriver;
