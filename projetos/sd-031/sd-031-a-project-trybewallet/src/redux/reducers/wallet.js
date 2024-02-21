import {
  SAVE_CURRENCIES,
  SAVE_EXPENSE,
  REMOVE_EXPENSE,
  START_EDIT,
  EDIT_EXPENSE,
} from '../actions';

const initialStateWallet = {
  currencies: [],
  expenses: [],
  editingId: null,
};

function wallet(state = initialStateWallet, action) {
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
        (expense) => (expense.id === action.payloadId ? action.payloadExpense : expense),
      ),
      editingId: null,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
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
