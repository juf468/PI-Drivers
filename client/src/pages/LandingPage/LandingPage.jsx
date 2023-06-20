import { Link } from 'react-router-dom';
import Style from './LandingPage.module.css';
import { memo } from 'react';

const LandingPage = memo(() => {
	return (
		<div className={Style.container}>
			<div className={Style.blur}>
				<Link to="/home" className={Style.button}>
					Lista de corredores
				</Link>
			</div>
		</div>
	);
});

export default LandingPage;
