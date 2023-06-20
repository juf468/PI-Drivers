import { Pagination } from './Pagination';
import { useSelector } from 'react-redux';
import { Card } from '../Card';
import Styles from './styles.module.css';

const driversPerPage = 9;

export const DriversList = () => {
	const drivers = useSelector((state) => state.allDrivers);
	const currentPage = useSelector((state) => state.currentPage);

	const totalDrivers = drivers?.length;

	const lastIndex = currentPage * driversPerPage;
	const firstIndex = lastIndex - driversPerPage;

	return (
		<div className={Styles.drivers_list_container}>
			<div className={Styles.drivers_container}>
				{totalDrivers ? (
					drivers
						.map((driver) => (
							<Card
								key={driver.id}
								id={driver.id}
								name={driver.name}
								surname={driver.surname}
								image={driver.image}
								teams={driver.teams}
							/>
						))
						.slice(firstIndex, lastIndex)
				) : (
					<p style={{ fontSize: 24, margin: 'auto', color: 'white' }}>
						No hay conductores
					</p>
				)}
			</div>
			<Pagination />
		</div>
	);
};
