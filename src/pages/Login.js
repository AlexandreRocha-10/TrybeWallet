import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { userEmail } from '../redux/actions';

const PASSWORD_MIN_LENGTH = 6;

function Login({ history }) {
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
    <main>
      <form>
        <h1>Bem Vindo!</h1>
        <h2>Login</h2>
        <input
          placeholder="Email"
          type="email"
          data-testid="email-input"
          name="email"
          onChange={ handleEmailChange }
          value={ email }
          required
        />
        <input
          placeholder="Senha"
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ handlePasswordChange }
          value={ password }
          required
        />
        <button
          className="btn"
          type="button"
          disabled={ isDisabled }
          data-testid="btn-login"
          onClick={ handleLoginClick }
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
