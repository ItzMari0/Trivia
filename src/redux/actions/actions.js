import fetchTriviaQuestion from '../../services/fetchTriviaQ';

export const GET_TOKEN = 'GET_TOKEN';
export const ERROR = 'ERROR';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const NEW_LOGIN = 'NEW_LOGIN';
export const GET_USER_INFO = 'GET_USER_INFO';

const fetchError = () => ({
  type: ERROR,
});

const getQuestions = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export function fetchQuestions(token) {
  return async (dispatch) => {
    try {
      const questions = await fetchTriviaQuestion(token);
      dispatch(getQuestions(questions));
    } catch {
      dispatch(fetchError());
    }
  };
}

export const newLogin = () => ({
  type: NEW_LOGIN,
});

export const getUserInfo = (payload) => ({
  type: GET_USER_INFO,
  payload,
});
