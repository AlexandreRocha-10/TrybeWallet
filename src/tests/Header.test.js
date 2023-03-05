import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Header from '../components/Header';

const initialState = {
  user: { email: 'alexandre@email.com' },
};

describe('Teste o componente <Header.js />', () => {
  it('Teste se o Email do usuário está sendo renderizado na tela', () => {
    renderWithRouterAndRedux(<Header />, { initialState });
    const userInfo = screen.getByRole('heading', {
      name: /email: alexandre@email\.com/i,
    });

    expect(userInfo).toBeInTheDocument();
  });

  it('Teste se a Soma Total do usuário está sendo renderizada na tela', () => {
    renderWithRouterAndRedux(<Header />, { initialState });
    const total = screen.getByRole('heading', {
      name: /0\.00/i,
    });

    expect(total).toBeInTheDocument();
  });
});
