import { SAVE_USER_EMAIL } from '../actions';

const initialStateUser = {
  email: '',
};

function user(state = initialStateUser, action) {
  switch (action.type) {
  case SAVE_USER_EMAIL:
    return {
      ...state,
      email: action.payloadUserEmail,
    };
  default:
    return state;
  }
}

export default user;
