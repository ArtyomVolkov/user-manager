import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import ROOT from '../reducers/index';
const STORE = createStore(
	ROOT,
	compose(
		applyMiddleware(
			thunkMiddleware
		),
		window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()
	)
);

// action handler
// STORE.subscribe(() => {
// 	console.log(STORE.getState());
// });

export default STORE;
