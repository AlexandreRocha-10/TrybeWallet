import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
  from 'mdb-react-ui-kit';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { FaBitcoin } from 'react-icons/fa';

import { userEmail } from '../redux/actions';

const PASSWORD_MIN_LENGTH = 6;

function NewLogin({ history }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const emailRegex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  const handleEmailChange = ({ target }) => {
    const value1 = target.value;
    setEmail(value1);
    setIsDisabled(!emailRegex.test(value1) || password.length < PASSWORD_MIN_LENGTH);
  };

  const handlePasswordChange = ({ target }) => {
    const value1 = target.value;
    setPassword(value1);
    setIsDisabled(!emailRegex.test(email) || value1.length < PASSWORD_MIN_LENGTH);
  };

  const handleLoginClick = () => {
    dispatch(userEmail(email));
    history.push('/carteira');
  };

  return (
    <MDBContainer fluid>

      <div className="p-5 bg-image" style={ { backgroundImage: 'url(https://img.freepik.com/fotos-premium/mercado-de-acoes-ou-grafico-de-negociacao-forex-e-grafico-de-castical-para-fundo-de-investimento-financeiro_54178-921.jpg?w=826)', height: '300px' } } />

      <MDBCard
        className="mx-5 mb-5 p-5 shadow-5"
        style={ {
          marginTop: '-100px',
          background: 'hsla(0, 0%, 100%, 0.8)',
          backdropFilter: 'blur(30px)' } }
      >
        <MDBCardBody className="p-5 text-center">

          <FaBitcoin
            style={ { fontSize: 100 } }
          />

          <h2 className="fw-bold mb-5">Trybe Wallet</h2>

          <MDBInput
            wrapperClass="mb-4"
            label="Email"
            id="form1"
            type="email"
            data-testid="email-input"
            name="email"
            onChange={ handleEmailChange }
            value={ email }
            required
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form1"
            type="password"
            data-testid="password-input"
            name="password"
            onChange={ handlePasswordChange }
            value={ password }
            required
          />

          <MDBBtn
            className="w-100 mb-4"
            size="md"
            type="button"
            disabled={ isDisabled }
            data-testid="btn-login"
            onClick={ handleLoginClick }
          >
            sign up

          </MDBBtn>

        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

NewLogin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default NewLogin;
