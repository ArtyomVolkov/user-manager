import {RECEIVE_USERS} from './../actions/db-actions';

export default function users(state = [], action) {
	if (action.type === RECEIVE_USERS) {
		return [...action.users];
	}
	return state;
}
