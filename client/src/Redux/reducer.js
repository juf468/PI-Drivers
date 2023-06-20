import {
	ALPHABETICAL_ORDER,
	CHANGE_CURRENT_PAGE,
	FILTER_DRIVERS_API_OR_DB,
	FILTER_DRIVERS_BY_TEAM,
	GET_ALL_DRIVERS,
	GET_ALL_TEAMS,
	GET_DRIVER,
	GET_DRIVERS_BY_NAME,
	ORDEN_NACIMIENTO,
} from './actions';

const initialState = {
	driversTeams: [],
	allDrivers: [],
	currentPage: 1,
	pageNumbers: [],
};

const calculatePageNumbers = (driversLength) => {
	const tempPageNumberArray = [];

	for (let i = 1; i < Math.ceil(driversLength / 9); i++) {
		tempPageNumberArray.push(i);
	}

	return tempPageNumberArray;
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_DRIVERS:
			return {
				...state,
				allDrivers: action.payload,
				pageNumbers: calculatePageNumbers(action.payload.length),
				currentPage: 1,
			};
		case GET_DRIVER:
			return {
				...state,
				selectedDriver: action.payload,
			};

		case GET_ALL_TEAMS:
			return {
				...state,
				driversTeams: action.payload,
				currentPage: 1,
			};
		case FILTER_DRIVERS_BY_TEAM:
			const filteredDrivers = state.allDrivers.filter((driver) =>
				driver.teams?.includes(action.payload)
			);

			return {
				...state,
				allDrivers: filteredDrivers,
				pageNumbers: calculatePageNumbers(filteredDrivers.length),
				currentPage: 1,
			};
		case GET_DRIVERS_BY_NAME:
			return {
				...state,
				allDrivers: action.payload,
				pageNumbers: calculatePageNumbers(action.payload.length),
				currentPage: 1,
			};

		case ORDEN_NACIMIENTO:
			if (action.payload === 'mayor') {
				const sortedArray = state.allDrivers
					.slice()
					.sort((a, b) => new Date(a.date) - new Date(b.date));
				return {
					...state,
					allDrivers: sortedArray,
					pageNumbers: calculatePageNumbers(sortedArray.length),
					currentPage: 1,
				};
			}
			const sortedArray = state.allDrivers
				.slice()
				.sort((a, b) => new Date(b.date) - new Date(a.date));

			return {
				...state,
				allDrivers: sortedArray,
				pageNumbers: calculatePageNumbers(sortedArray.length),
				currentPage: 1,
			};
		case ALPHABETICAL_ORDER:
			const arrayAux = [...state.allDrivers];
			if (action.payload === 'A-Z') {
				arrayAux.sort(function (a, b) {
					var nameA = a.name.toUpperCase();
					var nameB = b.name.toUpperCase();

					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}

					return 0;
				});
			} else if (action.payload === 'Z-A') {
				arrayAux.sort(function (a, b) {
					var nameA = a.name.toUpperCase();
					var nameB = b.name.toUpperCase();

					if (nameA < nameB) {
						return 1;
					}
					if (nameA > nameB) {
						return -1;
					}

					return 0;
				});
			}

			return {
				...state,
				allDrivers: arrayAux,
				pageNumbers: calculatePageNumbers(arrayAux.length),
				currentPage: 1,
			};

		case FILTER_DRIVERS_API_OR_DB:
			const filteredByApi = state.allDrivers.filter(
				(driver) => driver.isFromApi === action.payload
			);

			return {
				...state,
				allDrivers: filteredByApi,
				pageNumbers: calculatePageNumbers(filteredByApi.length),
				currentPage: 1,
			};

		case CHANGE_CURRENT_PAGE:
			if (typeof action.payload === 'number') {
				return {
					...state,
					currentPage: action.payload,
				};
			}
			return {
				...state,
				currentPage: action.payload
					? state.currentPage + 1
					: state.currentPage - 1,
			};

		default:
			return { ...state };
	}
};

export default rootReducer;
