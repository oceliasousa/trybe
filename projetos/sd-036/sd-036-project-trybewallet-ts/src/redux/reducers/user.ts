import { SaveUserEmailAction } from '../actions';
import { SAVE_USER_EMAIL } from '../actions/types';

const initialState = {
  email: '',
};

function user(state = initialState, action: SaveUserEmailAction) {
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
