import {SET_MESSAGE, CLOSE_MESSAGE} from './../actions/message';

export default function message(state = {}, action) {
	switch (action.type) {
		case SET_MESSAGE:
			return {...action.message, id: Date.now()};

		case CLOSE_MESSAGE:
			return {};

		default:
			return state;
	}
}
