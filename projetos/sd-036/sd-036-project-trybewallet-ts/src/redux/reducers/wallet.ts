import { ExpenseType } from '../../types';
import {
  EditExpenseAction,
  RemoveExpenseAction,
  SaveCurrenciesAction,
  SaveExpenseAction,
  StartEditAction,
} from '../actions';
import {
  SAVE_CURRENCIES,
  SAVE_EXPENSE,
  REMOVE_EXPENSE,
  START_EDIT,
  EDIT_EXPENSE,
} from '../actions/types';

const initialState = {
  currencies: <string[]>[],
  expenses: <ExpenseType[]>[],
  editingId: <number | null>null,
};

type ActionType = SaveCurrenciesAction | SaveExpenseAction
| EditExpenseAction | RemoveExpenseAction | StartEditAction;

function wallet(state = initialState, action: ActionType) {
  switch (action.type) {
    case SAVE_CURRENCIES:
      return {
        ...state,
        currencies: action.payloadCurrencies,
      };
    case SAVE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.concat(action.payloadExpense),
      };
    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map(
          (expense: ExpenseType) => (expense.id === action.payloadId
            ? action.payloadExpense : expense),
        ),
        editingId: null,
      };
    case REMOVE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses
          .filter((expense: ExpenseType) => expense.id !== action.id),
      };
    case START_EDIT:
      return {
        ...state,
        editingId: action.id,
      };
    default:
      return state;
  }
}

export default wallet;
