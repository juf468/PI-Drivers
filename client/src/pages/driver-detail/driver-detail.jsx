import { useNavigate, useParams } from 'react-router-dom';
import { getDriver } from '../../Redux/actions';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from './driver-detail.module.css';

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
		<div className={Style.container}>
			<button onClick={handleBack} className={Style.back_button}>
				Atras
			</button>
			<div className={Style.driver_detail_container}>
				<div className={Style.content}>
					<div className={Style.name_container}>
						<h1 className={Style.h1name}>{driver.name}</h1>
						<h1 className={Style.h1surname}>{driver.surname}</h1>
					</div>

					<div className={Style.info_container}>
						<p className={Style.pDate}>{driver.date}</p>
						<p className={Style.pTeams}>{driver.teams}</p>
						<p className={Style.p}>{driver.nationality}</p>
					</div>

					<p className={Style.description}>{driver.description}</p>
				</div>

				<div className={Style.divId}>
					<img
						className={Style.img}
						src={imageError ?? driver.image}
						alt="driver-image"
						onError={handleImageError}
					/>
					<p className={Style.pId}>
						Driver ID: <span className={Style.spanId}>({driver.id})</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default DriverDetail;
