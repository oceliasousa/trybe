import { saveTokenStorage, removeTokenStorage } from '../../helpers/localStorage';

const initialStateUser = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
};

function user(state = initialStateUser, action) {
  switch (action.type) {
  case 'GET_TOKEN':
    saveTokenStorage(action.payloadToken.token);
    return {
      ...state,
      token: action.payloadToken.token,
    };
  case 'SAVE_USER_NAME':
    return {
      ...state,
      name: action.payloadUserName,
      assertions: 0,
      score: 0,
    };
  case 'SAVE_USER_EMAIL':
    return {
      ...state,
      gravatarEmail: action.payloadUserEmail,
    };
  case 'LOG_OUT':
    removeTokenStorage();
    return initialStateUser;
  case 'UPDATE_SCORE':
    return {
      ...state,
      score: action.payloadUserScore + state.score,
    };
  case 'UPDATE_ASSERTIONS':
    return {
      ...state,
      assertions: 1 + state.assertions,
    };
  default:
    return state;
  }
}

export default user;
