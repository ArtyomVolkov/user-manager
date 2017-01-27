import {combineReducers} from 'redux';
// reducers
import app from './app';
import users from './users';
import message from './message';

const ROOT = combineReducers({
  app,
  users,
  message
});

export default ROOT;
