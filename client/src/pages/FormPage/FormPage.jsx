import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
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

	const [selectedTeams, setSelectedTeams] = useState({});
	const [formErrors, setFormErrors] = useState({});

	const handleValidation = () => {
		const errors = validateForm(formData);
		setFormErrors(errors);
	};

	const handleTeams = (team) => {
		setSelectedTeams((prevTeams) => {
			const updatedTeams = { ...prevTeams };

			if (updatedTeams[team]) {
				delete updatedTeams[team];
			} else {
				updatedTeams[team] = team;
			}

			const formattedTeams = Object.values(updatedTeams).join(',');

			if (formattedTeams.length > 255) {
				alert('Seleccionaste muchas escuderías');
			}

			return updatedTeams;
		});
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		handleValidation();

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
	};

	useEffect(() => {
		handleValidation();
	}, [formData]);

	useEffect(() => {
		const formattedTeams = Object.values(selectedTeams).join(',');

		handleChange({
			target: {
				value: formattedTeams,
				name: 'team',
			},
		});
	}, [selectedTeams]);

	return (
		<div className={Style.div}>
			<div className={Style.div2}>
				<h1 className={Style.h1}>Crea un conductor</h1>
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
					{formErrors.name ? (
						<p className={Style.p}>{formErrors.name}</p>
					) : (
						<br />
					)}
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
					{formErrors.surname ? (
						<p className={Style.p}>{formErrors.surname}</p>
					) : (
						<br />
					)}
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
					{formErrors.nationality ? (
						<p className={Style.p}>{formErrors.nationality}</p>
					) : (
						<br />
					)}
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
					{formErrors.image ? (
						<p className={Style.p}>{formErrors.image}</p>
					) : (
						<br />
					)}

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
					{formErrors.date ? (
						<p className={Style.p}>{formErrors.date}</p>
					) : (
						<br />
					)}

					<label className={Style.label}>
						Descripción:
						<textarea
							className={Style.textArea}
							name="description"
							value={formData.description}
							onChange={handleChange}
							maxLength={255}
						/>
					</label>
					<br />

					<p className={Style.pEscuderias}>Escuderías:</p>
					<div className={Style.divEscuderias}>
						{teams.map((team) => (
							<label className={Style.labelEscuderias} key={team}>
								{team}
								<input
									className={Style.checkedTeam}
									type="radio"
									onChange={() => handleTeams(team)}
									checked={selectedTeams[team] ? true : false}
								/>
							</label>
						))}
					</div>
					{formErrors.team && Object.keys(selectedTeams).length === 0 ? (
						<p className={Style.p}>{formErrors.team}</p>
					) : (
						<br />
					)}

					<button className={Style.button} type="submit">
						Crear conductor
					</button>
				</form>
			</div>
		</div>
	);
};

export default FormPage;
