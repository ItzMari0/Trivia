import { combineReducers } from 'redux';
import user from './userReducer';
import questionsReducer from './questions';

const rootReducer = combineReducers({ user, questionsReducer });

export default rootReducer;
