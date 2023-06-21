export const validateForm = (formData) => {
	const errors = {};

	if (formData.name.trim() === '') {
		errors.name = 'El nombre es obligatorio';
	} else if (/[|°!#$%&/()=?\\¡¿{}\[\]*+~^:]/.test(formData.name)) {
		errors.name =
			'El nombre no puede contener los siguientes símbolos: : | °!#$%&/()=?\\¡¿{}[]*+~^';
	}

	if (formData.surname.trim() === '') {
		errors.surname = 'El apellido es obligatorio';
	}

	if (formData.nationality.trim() === '') {
		errors.nationality = 'La nacionalidad es obligatoria';
	}

	if (formData.image.trim() === '') {
		errors.image = 'La URL de la imagen es obligatoria';
	} else {
		const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
		const extension = formData.image.trim().split('.').pop().toLowerCase();
		if (!imageExtensions.includes(extension)) {
			errors.image = 'La imagen debe estar en formato JPG, JPEG, PNG o GIF';
		}
	}

	if (formData.date.trim() === '') {
		errors.date = 'La fecha de nacimiento es obligatoria';
	}

	return errors;
};
