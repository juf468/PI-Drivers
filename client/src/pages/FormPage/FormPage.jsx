import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_ROUTE, getAllDrivers, getAllTeams } from '../../Redux/actions';
import { validateForm } from '../validate';
import { useNavigate } from 'react-router-dom';
import Style from './Form.module.css';

const useGetData = () => {
	const dispatch = useDispatch();

	const teams = useSelector((state) => state.driversTeams);

	useEffect(() => {
		dispatch(getAllTeams());
	}, [dispatch]);

	return teams;
};

const FormPage = () => {
	useDispatch();
	const teams = useGetData();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		description: '',
		nationality: '',
		image: '',
		date: '',
		team: '',
	});

	const [formErrors, setFormErrors] = useState({});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleEscuderiaChange = (event) => {
		const selectedEscuderias = Array.from(
			event.target.selectedOptions,
			(option) => option.value
		);

		setFormData((prevData) => ({
			...prevData,
			team: selectedEscuderias,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const errors = validateForm(formData);
		setFormErrors(errors);

		if (Object.keys(errors).length === 0) {
			try {
				await axios.post(`${API_ROUTE}/drivers`, {
					name: formData.name,
					surname: formData.surname,
					description: formData.description,
					nationality: formData.nationality,
					image: formData.image,
					date: formData.date,
					team: formData.team,
				});
				dispatch(getAllDrivers());
				alert('Driver creado correctamente');
				navigate(-1);
			} catch {
				alert('Hubo un error intenta nuevamente');
			}
		}
	};

	return (
		<div className={Style.div}>
			<div style={{ width: '50%' }}>
				<h1 className={Style.h1}>Crear Nuevo Driver</h1>
				<form onSubmit={handleSubmit}>
					<label className={Style.label}>
						Nombre:
						<input
							className={Style.input}
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							maxLength={255}
						/>
					</label>
					<br />
					<label className={Style.label}>
						Apellido:
						<input
							className={Style.input}
							type="text"
							name="surname"
							value={formData.surname}
							onChange={handleChange}
							maxLength={255}
						/>
					</label>
					<br />
					<label className={Style.label}>
						Nacionalidad:
						<input
							className={Style.input}
							type="text"
							name="nationality"
							value={formData.nationality}
							onChange={handleChange}
							maxLength={255}
						/>
					</label>
					<br />
					<label className={Style.label}>
						Imagen:
						<input
							className={Style.input}
							type="text"
							name="image"
							value={formData.image}
							onChange={handleChange}
							maxLength={255}
						/>
					</label>
					<br />
					<label className={Style.label}>
						Fecha de Nacimiento:
						<input
							className={Style.date}
							type="date"
							name="date"
							value={formData.date}
							onChange={handleChange}
						/>
					</label>
					<br />
					<label className={Style.label}>
						Descripción:
						<textarea
							className={Style.input}
							style={{ height: '200px' }}
							name="description"
							value={formData.description}
							onChange={handleChange}
							maxLength={255}
						/>
					</label>
					<br />
					<label className={Style.label}>
						Escuderías:
						<select
							className={Style.select}
							name="teams"
							multiple
							value={formData.teams}
							onChange={handleEscuderiaChange}
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
					</label>
					{formErrors.name && <p className={Style.p}>{formErrors.name}</p>}
					{formErrors.surname && (
						<p className={Style.p}>{formErrors.surname}</p>
					)}
					{formErrors.nationality && (
						<p className={Style.p}>{formErrors.nationality}</p>
					)}
					{formErrors.image && <p className={Style.p}>{formErrors.image}</p>}
					{formErrors.date && <p className={Style.p}>{formErrors.date}</p>}
					{formErrors.team && <p className={Style.p}>{formErrors.team}</p>}

					<button className={Style.button} type="submit">
						Crear Driver
					</button>
				</form>
			</div>
		</div>
	);
};

export default FormPage;
