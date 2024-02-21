import { ExpenseType } from '../../types';
import {
  EDIT_EXPENSE,
  REMOVE_EXPENSE,
  SAVE_CURRENCIES,
  SAVE_EXPENSE,
  SAVE_USER_EMAIL,
  START_EDIT,
} from './types';

export type SaveUserEmailAction = {
  type: typeof SAVE_USER_EMAIL;
  payloadUserEmail: string;
};

export const saveUserEmail = (userEmail: string): SaveUserEmailAction => ({
  type: SAVE_USER_EMAIL,
  payloadUserEmail: userEmail,
});

export type SaveCurrenciesAction = {
  type: typeof SAVE_CURRENCIES;
  payloadCurrencies: string[];
};

export const saveCurrencies = (currencies: string[]): SaveCurrenciesAction => ({
  type: SAVE_CURRENCIES,
  payloadCurrencies: currencies,
});

export type SaveExpenseAction = {
  type: typeof SAVE_EXPENSE;
  payloadExpense: ExpenseType;
};

export const saveExpense = (expense: ExpenseType): SaveExpenseAction => ({
  type: SAVE_EXPENSE,
  payloadExpense: expense,
});

export type EditExpenseAction = {
  type: typeof EDIT_EXPENSE;
  payloadExpense: ExpenseType;
  payloadId: number;
};

export const editExpense = (expense: ExpenseType, id: number): EditExpenseAction => ({
  type: EDIT_EXPENSE,
  payloadExpense: expense,
  payloadId: id,
});

export type RemoveExpenseAction = {
  type: typeof REMOVE_EXPENSE;
  id: number;
};

export const removeExpense = (id: number): RemoveExpenseAction => ({
  type: REMOVE_EXPENSE,
  id,
});

export type StartEditAction = {
  type: typeof START_EDIT;
  id: number;
};

export const startEdit = (id: number): StartEditAction => ({
  type: START_EDIT,
  id,
});
