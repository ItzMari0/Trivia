import { combineReducers } from 'redux';
import player from './player';
import questionsReducer from './questions';

const rootReducer = combineReducers({ player, questionsReducer });

export default rootReducer;
