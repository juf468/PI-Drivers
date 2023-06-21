import { useState } from 'react';
import { Link } from 'react-router-dom';
import Style from './card.module.css';

export const Card = ({ id, image, name, surname, teams }) => {
	const [imageError, setImageError] = useState(null);

	const handleImageError = () => {
		setImageError('https://media.tenor.com/x3X71q4UOT8AAAAd/formula1-f1.gif');
	};

	return (
		<div className={Style.container}>
			<Link to={`/driver/${id}`} className={Style.card}>
				<img
					className={Style.image}
					onError={handleImageError}
					src={imageError ?? image}
					alt={`${name} picture`}
				/>
				<Link className={Style.info_driver_container}>
					<div className={Style.info_driver}>
						<h1 className={Style.h1Name}>{name}</h1>
						<h1>{surname}</h1>
					</div>
					<h2>{teams?.replace(/,/g, ', ')}</h2>
				</Link>
			</Link>
		</div>
	);
};
