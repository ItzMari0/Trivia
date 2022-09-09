import { GET_QUESTIONS, ERROR, NEW_LOGIN } from '../actions/actions';

const INITIAL_STATE = {
  questions: [],
  response_code: 0,
  isInvalid: false,
};

const testToken = (state, action) => {
  if (action.payload.results.length > 0) {
    return {
      ...state,
      questions: action.payload.results,
      response_code: action.payload.response_code };
  }
  return { ...state, isInvalid: true };
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return testToken(state, action);
  case ERROR:
    return {
      ...state,
      isInvalid: true,
    };
  case NEW_LOGIN:
    return {
      ...state,
      isInvalid: false,
    };
  default:
    return state;
  }
};

export default questionsReducer;
