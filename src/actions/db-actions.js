import * as axios from 'axios';
import {USERS, CREATE_NEW_USER, DELETE_USER, UPDATE_USER} from './../settings';

export function getUsers() {
	return axios.get(USERS);
}

export function createUser(data) {
	return axios.post(CREATE_NEW_USER, {data});
}

export function deleteUser(id) {
	return axios.delete(DELETE_USER + id);
}

export function updateUser(data) {
	return axios.put(UPDATE_USER + data.id, {data});
}