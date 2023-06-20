import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '../SearchBar';
import { useEffect, useState } from 'react';
import {
	alphabeticalOrder,
	filterDriversApiOrDb,
	filterDriversByTeam,
	getAllDrivers,
	getAllTeams,
	sortByBirthDate,
} from '../../Redux/actions';
import { Link } from 'react-router-dom';
import Styles from './navbar.module.css';

const useGetData = () => {
	const dispatch = useDispatch();
	const teams = useSelector((state) => state.driversTeams);

	useEffect(() => {
		dispatch(getAllDrivers());
		dispatch(getAllTeams());
	}, [dispatch]);

	return teams;
};

export const Navbar = () => {
	const dispatch = useDispatch();
	const teams = useGetData();
	const [hasDateFilter, setHasDatetFilter] = useState(false);
	const [hasApiFilter, setHasApiFilter] = useState(false);

	const handlerFilter = (event) => {
		event.preventDefault();
		const team = event.target.value;
		dispatch(filterDriversByTeam(team));
		setHasDatetFilter(true);
	};

	const handleCleanFilters = () => {
		dispatch(getAllDrivers());
		setHasDatetFilter(false);
		setHasApiFilter(false);
	};

	const handleSort = (orden) => {
		dispatch(sortByBirthDate(orden));
	};

	const handlerOrder = (event) => {
		const { value } = event.target;
		dispatch(alphabeticalOrder(value));
	};

	const handleFilterFromApi = (isFromApi) => {
		setHasApiFilter(true);
		dispatch(filterDriversApiOrDb(isFromApi));
	};

	return (
		<nav className={Styles.container}>
			<section className={Styles.filter_container}>
				<select
					className={Styles.select}
					onChange={handlerOrder}
					name="Orden alfabetico"
					defaultValue={'DEFAULT'}
				>
					<option value="DEFAULT" disabled>
						Orden alfabetico
					</option>
					<option value="A-Z">A-Z</option>
					<option value="Z-A">Z-A</option>
				</select>
				{!hasDateFilter && (
					<select
						className={Styles.select}
						onChange={handlerFilter}
						name="teams"
						defaultValue={'DEFAULT'}
					>
						<option value="DEFAULT" disabled>
							Teams
						</option>
						{teams.map((team, index) => (
							<option key={index} value={team}>
								{team}
							</option>
						))}
					</select>
				)}
				<button className={Styles.button} onClick={() => handleSort('menor')}>
					Menor a mayor
				</button>
				<button className={Styles.button} onClick={() => handleSort('mayor')}>
					Mayor a menor
				</button>
				<button className={Styles.button} onClick={() => handleCleanFilters()}>
					Limpiar filtros
				</button>
			</section>

			<section className={Styles.searchbar_container}>
				{!hasApiFilter ? (
					<>
						<button
							className={Styles.button}
							onClick={() => handleFilterFromApi(true)}
							style={{ margin: '0 8px' }}
						>
							Mostrar drivers de la API
						</button>
						<button
							style={{ margin: '0 8px' }}
							className={Styles.button}
							onClick={() => handleFilterFromApi(false)}
						>
							Mis drivers
						</button>
					</>
				) : null}
				<Link
					to="/form-page"
					className={Styles.button}
					style={{ margin: '0 8px' }}
				>
					Crear conductor
				</Link>
				<SearchBar />
			</section>
		</nav>
	);
};
