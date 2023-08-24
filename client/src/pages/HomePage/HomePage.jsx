import { DriversList, Navbar } from '../../components';
import Styles from './HomePage.module.css';

const HomePage = () => {
	return (
		<div className={Styles.container}>
			<h1>hola</h1>
			<Navbar />
			<DriversList />
		</div>
	);
};

export default HomePage;
