import { useNavigate, useParams } from 'react-router-dom';
import { getDriver } from '../../Redux/actions';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styles from './driver-detail.module.css';

const useGetDriver = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const driver = useSelector((state) => state.selectedDriver);

	useEffect(() => {
		dispatch(getDriver(id));
	}, [dispatch, id]);

	return driver;
};

const DriverDetail = () => {
	const driver = useGetDriver();
	const navigate = useNavigate();
	const [imageError, setImageError] = useState(null);

	const handleImageError = () => {
		setImageError('https://media.tenor.com/x3X71q4UOT8AAAAd/formula1-f1.gif');
	};

	const handleBack = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	if (!driver) {
		return <p>Loading...</p>;
	}

	return (
		<div className={Styles.container}>
			<button onClick={handleBack} className={Styles.back_button}>
				Atras
			</button>
			<div className={Styles.driver_detail_container}>
				<div className={Styles.content}>
					<div className={Styles.name_container}>
						<h1 className={Styles.h1name}>{driver.name}</h1>
						<h1 className={Styles.h1surname}>{driver.surname}</h1>
					</div>

					<div className={Styles.info_container}>
						<p className={Styles.pDate}>{driver.date}</p>
						<p className={Styles.pTeams}>{driver.teams}</p>
						<p className={Styles.p}>{driver.nationality}</p>
					</div>

					<p className={Styles.description}>{driver.description}</p>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<img
						className={Styles.img}
						src={imageError ?? driver.image}
						alt="driver-image"
						onError={handleImageError}
					/>
					<p style={{ fontSize: 24, marginLeft: '2rem' }}>
						Driver ID: <span style={{ marginLeft: '1rem' }}>({driver.id})</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default DriverDetail;
