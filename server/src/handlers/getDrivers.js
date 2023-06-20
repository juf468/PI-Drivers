const {
	getAllDrivers,
	getDriverByName,
} = require('../controllers/DriverController');

const getDrivers = async (req, res) => {
	try {
		const { name } = req.query;

		if (name) {
			const drivers = await getDriverByName(name);
			res.status(200).json(drivers);
		} else {
			const allDrivers = await getAllDrivers();
			return res.status(200).json(allDrivers);
		}
	} catch (error) {
		res.status(404).json({ error: 'No se encontraron conductores.' });
	}
};
module.exports = getDrivers;
