import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import { useDispatch, useSelector } from 'react-redux';
import { deleteSelected } from '../redux/actions';

export default function NewTable() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.wallet.expenses);

  const handleDeleteClick = ({ target }) => {
    const { value } = target;
    const filterDelete = expenses.filter((expense) => expense.id !== +value);
    dispatch(deleteSelected(filterDelete));
  };

  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Tag</th>
          <th scope="col">Método de pagamento</th>
          <th scope="col">Valor</th>
          <th scope="col">Moeda</th>
          <th scope="col">Editar/Excluir</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody align="middle">
        {expenses.map((e) => (
          <tr key={ e.id }>
            <td className="fw-bold mb-1">{e.description}</td>
            <td>
              <MDBBadge color="success" pill>
                {e.tag}
              </MDBBadge>
            </td>
            <td className="fw-normal mb-1">{e.method}</td>
            <td className="fw-normal mb-1">{(e.value * 1).toFixed(2)}</td>
            <td className="fw-normal mb-1">{e.exchangeRates[e.currency].name}</td>
            <td>
              <MDBBtn
                data-testid="edit-btn"
                style={ { marginBottom: '2px' } }
              >
                Editar

              </MDBBtn>
              <MDBBtn
                className="me-1"
                color="danger"
                id={ e.id }
                data-testid="delete-btn"
                onClick={ handleDeleteClick }
              >
                Excluir
              </MDBBtn>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
