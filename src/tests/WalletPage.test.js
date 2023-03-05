import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Teste a página <Wallet.js />', () => {
  it('Teste se os elementos do Form são renderizados', () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const btn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  it('Teste se o Fetch é chamado para renderizar as moedas', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    global.fetch.mockClear();
  });

  it('Teste se ao entrar com valores o formulário é preenchido corretamente', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = await screen.findByTestId('currency-input', { name: 'USD' });
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const btn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(value, '100');
    userEvent.type(description, 'Ifood');
    userEvent.selectOptions(method, ['Dinheiro']);
    userEvent.selectOptions(tag, ['Alimentação']);

    expect(currency).toBeInTheDocument();

    userEvent.click(btn);

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
