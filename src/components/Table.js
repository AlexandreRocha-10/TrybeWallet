/* eslint-disable max-len */
import React from 'react';
import '../styles/Table.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSelected } from '../redux/actions';

function Table() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.wallet.expenses);

  const handleDeleteClick = ({ target }) => {
    const { value } = target;
    const filterDelete = expenses.filter((expense) => expense.id !== +value);
    dispatch(deleteSelected(filterDelete));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="title">Descrição</th>
          <th className="title">Tag</th>
          <th className="title">Método de pagamento</th>
          <th className="title">Valor</th>
          <th className="title">Moeda</th>
          <th className="title">Câmbio utilizado</th>
          <th className="title">Valor convertido</th>
          <th className="title">Moeda de conversão</th>
          <th className="title">Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e) => (
          <tbody key={ e.id }>
            <tr>
              <td className="table-element">{e.description}</td>
              <td className="table-element">{e.tag}</td>
              <td className="table-element">{e.method}</td>
              <td className="table-element">{(e.value * 1).toFixed(2)}</td>
              <td className="table-element">{e.exchangeRates[e.currency].name}</td>
              <td className="table-element">{(e.exchangeRates[e.currency].ask * 1).toFixed(2)}</td>
              <td className="table-element">{(e.value * e.exchangeRates[e.currency].ask).toFixed(2)}</td>
              <td className="table-element">Real</td>
              <td>
                <button type="button" data-testid="edit-btn">
                  Editar
                </button>
                <button
                  id={ e.id }
                  type="button"
                  data-testid="delete-btn"
                  onClick={ handleDeleteClick }
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
