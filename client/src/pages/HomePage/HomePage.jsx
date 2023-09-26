import { DriversList, Navbar } from '../../components';
import Styles from './HomePage.module.css';

const HomePage = () => {
	return (
		<div className={Styles.container}>
			<Navbar />
			<DriversList />
		</div>
	);
};

export default HomePage;
