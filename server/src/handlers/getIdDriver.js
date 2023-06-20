const { getDriversById } = require('../controllers/DriverController');

const getIdDriver = async (req, res) => {
	try {
		const { id } = req.params;
		if (id) {
			const driver = await getDriversById(id);
			if (driver) {
				res.status(200).json(driver);
			}
		}
	} catch (error) {
		res.status(404).json({ error: 'id no encontrado' });
	}
};
module.exports = getIdDriver;
