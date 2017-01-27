export const SET_MESSAGE = 'SET_MESSAGE';
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE';

export function setMessage(message = {}) {
	return {
		type: SET_MESSAGE,
		message
	}
}

export function closeMessage() {
	return {
		type: CLOSE_MESSAGE
	}
}
