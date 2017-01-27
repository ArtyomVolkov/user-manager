import * as axios from 'axios';
import {USERS, CREATE_NEW_USER, DELETE_USER, UPDATE_USER} from './../settings';
import {setMessage} from './message';

// Action Types
export const RECEIVE_USERS = 'RECEIVE_USERS';

export function getUsers() {
	return axios.get(USERS);
}

export function fetchUsers() {
	return function (dispatch) {
		return axios.get(USERS).
		then((response) => {
			dispatch(receiveUsers(response.data));
		}).
		catch((error) => {
			dispatch(
				setMessage({
					type: 'error',
					text: error.message,
					action: 'close',
					duration: 3000
				})
			)
		});
	}
}

function receiveUsers(users = []) {
	return {
		type: RECEIVE_USERS,
		users
	}
}

export function createUser(data) {
	return function (dispatch) {
		return axios.post(CREATE_NEW_USER, {data});
	}
}

export function deleteUser(id) {
	return function (dispatch) {
		return axios.delete(DELETE_USER + id);
	}
}

export function updateUser(data) {
	return function(dispatch) {
		return axios.put(UPDATE_USER + data.id, {data});
	}
}