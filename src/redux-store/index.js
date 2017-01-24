import {createStore} from 'redux';
import ROOT from '../reducers/index';

const STORE = createStore(ROOT,
	window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()
);

// action handler
// STORE.subscribe(() => {
// 	console.log(STORE.getState());
// });

export default STORE;
