import * as axios from 'axios';
import {USERS} from './../settings';

export function getUsers() {
	return axios.get(USERS);
}