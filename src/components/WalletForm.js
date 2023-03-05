import React, { useState, useEffect } from 'react';
import '../styles/walletForm.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, fetchCurrencies } from '../redux/actions';
import expensesAPI from '../services/expensesAPI';

function WalletForm({ dispatch, currencies }) {
  const [expense, setExpense] = useState({
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'alimentação',
    exchangeRates: {},
  });

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  const handleClick = async () => {
    const exchangeRates = await dispatch(expensesAPI());

    const newExpense = { ...expense, exchangeRates };

    dispatch(addExpense(newExpense));

    setExpense({
      id: (expense.id + 1),
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  };

  const { value, description, method, currency, tag } = expense;

  return (
    <form className="walletForm">
      <label htmlFor="value">
        Valor da despesa:
        <input
          type="number"
          data-testid="value-input"
          name="value"
          onChange={ handleChange }
          value={ value }
        />
      </label>
      <label htmlFor="description">
        Descrição da Despesa:
        <input
          type="text"
          data-testid="description-input"
          name="description"
          onChange={ handleChange }
          value={ description }
        />
      </label>
      <label htmlFor="currency-input">
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          id="currency-input"
          onChange={ handleChange }
          value={ currency }
        >
          {currencies.map((curr, index) => (
            <option key={ `${curr}${index}` }>{curr}</option>
          ))}
        </select>
      </label>
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          data-testid="method-input"
          name="method"
          id="method-input"
          onChange={ handleChange }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="tag-input">
        Tag:
        <select
          data-testid="tag-input"
          name="tag"
          id="tag-input"
          onChange={ handleChange }
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <button type="button" onClick={ handleClick }>
        Adicionar despesa
      </button>
    </form>
  );
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
