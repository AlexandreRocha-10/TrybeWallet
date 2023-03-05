import { ADD_EXPENSE, REQUEST_CURRENCY, DELETE_SELECTED } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalConverted: 0,
};

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      currencies: payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload],
      totalConverted: state.totalConverted
        + (payload.value
          * payload.exchangeRates[payload.currency].ask),
    };
  case DELETE_SELECTED:
    return {
      ...state,
      expenses: payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
