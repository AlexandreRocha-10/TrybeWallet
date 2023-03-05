import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Teste o componente <Table.js />', () => {
  it('Teste se os elementos da Table são renderizados', () => {
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'] });

    const descrip = screen.getByRole('columnheader', { name: /descrição/i });
    const tag = screen.getByRole('columnheader', { name: /tag/i });
    const type = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const value = screen.getByRole('columnheader', { name: 'Valor' });
    const coin = screen.getByRole('columnheader', { name: 'Moeda' });
    const rate = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const convert = screen.getByRole('columnheader', { name: /valor convertido/i });
    const convertcoin = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const edit = screen.getByRole('columnheader', { name: /editar\/excluir/i });

    expect(descrip).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(coin).toBeInTheDocument();
    expect(rate).toBeInTheDocument();
    expect(convert).toBeInTheDocument();
    expect(convertcoin).toBeInTheDocument();
    expect(edit).toBeInTheDocument();
  });

  it('Teste se os elementos da Table são renderizados', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const description = screen.getByTestId('description-input');
    const value = screen.getByTestId('value-input');
    const addBtn = screen.getByRole('button', { id: 'expense-button' });

    userEvent.type(value, '200');
    userEvent.type(description, 'churrasco');
    userEvent.click(addBtn);

    const deleteBtn = await screen.findByTestId('delete-btn');

    expect(deleteBtn).toBeInTheDocument();

    userEvent.type(value, '500');
    userEvent.type(description, 'cerveja');
    userEvent.click(addBtn);

    const expense1 = await screen.findByText('churrasco');
    const expense2 = await screen.findByText('cerveja');

    expect(expense1).toBeInTheDocument();
    expect(expense2).toBeInTheDocument();

    userEvent.click(deleteBtn);

    expect(expense2).not.toBeInTheDocument();

    userEvent.click(deleteBtn);

    expect(expense1).not.toBeInTheDocument();
  });
});
