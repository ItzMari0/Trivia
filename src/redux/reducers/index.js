import { combineReducers } from 'redux';
import userReducer from './user';
import questionsReducer from './questions';

const rootReducer = combineReducers({ userReducer, questionsReducer });

export default rootReducer;
