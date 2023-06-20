import { useState } from 'react';
import { Link } from 'react-router-dom';
import Style from './card.module.css';

export const Card = ({ id, image, name, surname, teams }) => {
	const [imageError, setImageError] = useState(null);

	const handleImageError = () => {
		setImageError(
			'https://i0.wp.com/neonstation.com/wp-content/uploads/2020/10/FormulaOneF1NeonSignTurquoise.jpg'
		);
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
						<h1 style={{ marginRight: '1rem' }}>{name}</h1>
						<h1>{surname}</h1>
					</div>
					<h2>{teams?.replace(/,/g, ', ')}</h2>
				</Link>
			</Link>
		</div>
	);
};
