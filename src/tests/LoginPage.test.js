import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const EMAIL = 'alexandre@email.com';
const PASSWORD = '123456';
const emailInput = 'email-input';
const passwordInput = 'password-input';

describe('Teste a página <Login.js />', () => {
  it('Teste se o link da página é /', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste se o Email, Password estão sendo renderizados na tela', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it('Teste se o Botão de Login está desabilitado e sendo renderizado na tela', () => {
    renderWithRouterAndRedux(<App />);

    const loginBtn = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();
  });

  it('Teste se ao entrar com email e senha o botão é habilitado e o caminho é direcionado para a carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const loginBtn = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(email, EMAIL);
    userEvent.type(password, PASSWORD);

    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeEnabled();

    userEvent.click(loginBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
