import { Pagination } from './Pagination';
import { useSelector } from 'react-redux';
import { Card } from '../Card';
import Style from './styles.module.css';

const driversPerPage = 9;

export const DriversList = () => {
	const drivers = useSelector((state) => state.allDrivers);
	const currentPage = useSelector((state) => state.currentPage);

	const totalDrivers = drivers?.length;

	const lastIndex = currentPage * driversPerPage;
	const firstIndex = lastIndex - driversPerPage;

	return (
		<div className={Style.drivers_list_container}>
			<div className={Style.drivers_container}>
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
					<p className={Style.pno}>No hay conductores</p>
				)}
			</div>
			<Pagination />
		</div>
	);
};
