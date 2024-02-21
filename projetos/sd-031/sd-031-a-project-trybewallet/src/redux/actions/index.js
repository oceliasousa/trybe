export const SAVE_USER_EMAIL = 'SAVE_USER_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const START_EDIT = 'START_EDIT';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const saveUserEmail = (userEmail) => ({
  type: SAVE_USER_EMAIL,
  payloadUserEmail: userEmail,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payloadCurrencies: currencies,
});

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  payloadExpense: expense,
});

export const editExpense = (expense, id) => ({
  type: EDIT_EXPENSE,
  payloadExpense: expense,
  payloadId: id,
});

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

export const startEdit = (id) => ({
  type: START_EDIT,
  id,
});
