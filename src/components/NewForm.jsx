/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
}
  from 'mdb-react-ui-kit';

import PropTypes from 'prop-types';
import { addExpense, fetchCurrencies } from '../redux/actions';
import expensesAPI from '../services/expensesAPI';

function NewForm({ dispatch, currencies }) {
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
    <MDBContainer fluid className="bg-dark">

      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>

          <MDBCard className="my-4">

            <MDBRow className="g-0">

              <MDBCol md="6" className="d-none d-md-block">
                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp" alt="Sample photo" className="rounded-start" fluid />
              </MDBCol>

              <MDBCol md="6">

                <MDBCardBody
                  className="text-black d-flex flex-column justify-content-center"
                >
                  <h3
                    className="mb-5 text-uppercase fw-bold"
                  >
                    Cadastre uma nova despesa
                  </h3>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Descrição da despesa"
                    size="lg"
                    id="form3"
                    type="text"
                    data-testid="description-input"
                    name="description"
                    onChange={ handleChange }
                    value={ description }
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Valor"
                    size="lg"
                    id="form3"
                    type="number"
                    data-testid="value-input"
                    name="value"
                    onChange={ handleChange }
                    value={ value }
                  />

                  <div style={ { display: 'flex' } }>
                    <label
                      htmlFor="currency-input"
                      className="select is-info"
                      style={ { width: 100, marginBottom: '20px' } }
                    >
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
                    <label
                      htmlFor="method-input"
                      className="select is-info"
                    >
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
                  </div>

                  <div
                    className="d-md-flex ustify-content-start align-items-center mb-4"
                    onChange={ handleChange }
                    value={ tag }
                  >
                    <MDBRadio name="inlineRadio" id="inlineRadio1" value="Alimentação" label="Alimentação" inline />
                    <MDBRadio name="inlineRadio" id="inlineRadio2" value="Lazer" label="Lazer" inline />
                    <MDBRadio name="inlineRadio" id="inlineRadio3" value="Trabalho" label="Trabalho" inline />
                  </div>

                  <div
                    className="d-md-flex ustify-content-start align-items-center mb-4"
                    onChange={ handleChange }
                    value={ tag }
                  >
                    <MDBRadio name="inlineRadio" id="inlineRadio1" value="Transporte" label="Transporte" inline />
                    <MDBRadio name="inlineRadio" id="inlineRadio2" value="Saúde" label="Saúde" inline />
                    <MDBRadio name="inlineRadio" id="inlineRadio3" value="Outros" label="Outros" inline />
                  </div>

                  <div className="d-flex justify-content-end pt-3">
                    <MDBBtn color="light" size="lg">Reset</MDBBtn>
                    <MDBBtn
                      className="ms-2"
                      color="primary"
                      size="lg"
                      onClick={ handleClick }
                    >
                      Cadastrar
                    </MDBBtn>
                  </div>

                </MDBCardBody>

              </MDBCol>
            </MDBRow>

          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

NewForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(NewForm);
