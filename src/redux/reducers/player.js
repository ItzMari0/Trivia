import md5 from 'crypto-js/md5';
import { CORRECT_ANSWER, ERROR, GET_USER_INFO } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  avatar: '',
  score: 0,
  assertions: 0,
};

const setUserInfo = (userInfo, state) => {
  const { email, name } = userInfo;
  const hash = md5(email).toString();
  const avatar = `https://www.gravatar.com/avatar/${hash}`;
  return ({ ...state, name, avatar, score: 0, assertions: 0 });
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ERROR:
    return { ...state, error: true };
  case GET_USER_INFO:
    return setUserInfo(action.payload, state);
  case CORRECT_ANSWER:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
