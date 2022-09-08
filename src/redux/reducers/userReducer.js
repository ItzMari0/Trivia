import md5 from 'crypto-js/md5';
import { ERROR, GET_USER_INFO } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  avatar: '',
  score: 0,
};

const setUserInfo = (userInfo, state) => {
  const { email, name } = userInfo;
  const hash = md5(email).toString();
  const avatar = `https://www.gravatar.com/avatar/${hash}`;
  return ({ ...state, name, avatar });
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ERROR:
    return { ...state, error: true };
  case GET_USER_INFO:
    return setUserInfo(action.payload, state);
  default:
    return state;
  }
};

export default user;
