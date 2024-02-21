export const GET_TOKEN = 'GET_TOKEN';
export const SAVE_USER_NAME = 'SAVE_USER_NAME';
export const SAVE_USER_EMAIL = 'SAVE_USER_EMAIL';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const getToken = (data) => ({
  type: 'GET_TOKEN',
  payloadToken: data,
});

export const saveUserName = (userName) => ({
  type: 'SAVE_USER_NAME',
  payloadUserName: userName,
});

export const saveUserEmail = (userEmail) => ({
  type: 'SAVE_USER_EMAIL',
  payloadUserEmail: userEmail,
});

export const logOut = () => ({
  type: 'LOG_OUT',
});

export const updateScore = (userScore) => ({
  type: 'UPDATE_SCORE',
  payloadUserScore: userScore,
});

export const updateAssertions = () => ({
  type: 'UPDATE_ASSERTIONS',
});

export function thunkToken() {
  return async (dispatch) => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(getToken(data));
  };
}
