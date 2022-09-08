import fetchTriviaToken from '../../services/fetchTrivia';

export const GET_TOKEN = 'GET_TOKEN';
export const ERROR = 'ERROR';

const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

const fetchError = () => ({
  type: ERROR,
});

export const fetchToken = async () => {
  try {
    const tokenObject = await fetchTriviaToken();
    getToken(tokenObject);
  } catch {
    fetchError();
  }
};
