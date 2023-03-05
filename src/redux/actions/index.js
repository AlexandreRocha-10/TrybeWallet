import getCurrency from '../../services/currencyAPI';

export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_SELECTED = 'DELETE_SELECTED';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const requestCurrency = (currencies) => ({
  type: REQUEST_CURRENCY,
  payload: currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  const currencyInfo = await getCurrency();
  dispatch(requestCurrency(currencyInfo));
};

export const addExpense = (expensesInfo) => ({
  type: ADD_EXPENSE,
  payload: expensesInfo,
});

export const deleteSelected = (expensesInfo) => ({
  type: DELETE_SELECTED,
  payload: expensesInfo,
});
