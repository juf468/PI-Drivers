import axios from 'axios';

export const API_ROUTE = 'http://localhost:3001';

export const GET_ALL_DRIVERS = 'GET_ALL_DRIVERS';
export const GET_DRIVER = 'GET_DRIVER';
export const GET_ALL_TEAMS = 'GET_ALL_TEAMS';
export const ORDEN_NACIMIENTO = 'ORDEN_NACIMIENTO';
export const FILTER_DRIVERS_BY_TEAM = 'FILTER_DRIVERS_BY_TEAM';
export const ALPHABETICAL_ORDER = 'ALPHABETICAL_ORDER';
export const FILTER_DRIVERS_API_OR_DB = 'FILTER_DRIVERS_API_OR_DB';
export const GET_DRIVERS_BY_NAME = 'GET_DRIVERS_BY_NAME';
export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';

export const getAllDrivers = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${API_ROUTE}/drivers`);
			return dispatch({
				type: 'GET_ALL_DRIVERS',
				payload: data,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
};

export const getDriver = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${API_ROUTE}/drivers/${id}`);
			return dispatch({
				type: 'GET_DRIVER',
				payload: data,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
};

export const getDriversByName = (name) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${API_ROUTE}/drivers?name=${name}`);
			return dispatch({
				type: 'GET_DRIVERS_BY_NAME',
				payload: data,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
};

export const getAllTeams = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${API_ROUTE}/teams`);

			return dispatch({
				type: 'GET_ALL_TEAMS',
				payload: data,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
};

export const sortByBirthDate = (orden) => {
	return {
		type: 'ORDEN_NACIMIENTO',
		payload: orden,
	};
};

export const filterDriversByTeam = (team) => {
	return {
		type: 'FILTER_DRIVERS_BY_TEAM',
		payload: team,
	};
};

export const alphabeticalOrder = (order) => {
	return {
		type: 'ALPHABETICAL_ORDER',
		payload: order,
	};
};

export const filterDriversApiOrDb = (payload) => {
	return {
		type: 'FILTER_DRIVERS_API_OR_DB',
		payload: payload,
	};
};

export const changeCurrentPage = (payload) => {
	return {
		type: 'CHANGE_CURRENT_PAGE',
		payload: payload,
	};
};
