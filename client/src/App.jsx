import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import HomePage from './pages/HomePage/HomePage';
import DriverDetail from './pages/driver-detail/driver-detail';
import FormPage from './pages/FormPage/FormPage';

const App = () => {
	return (
		<div className="background">
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/driver/:id" element={<DriverDetail />} />
				<Route path="/form-page" element={<FormPage />}></Route>
			</Routes>
		</div>
	);
};
export default App;
