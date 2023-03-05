import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import Wallet from '../pages/Wallet';

describe('Teste o componente <WalletForm.js />', () => {
  it('Teste se as despesas são adicionadas e renderizadas na tela', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();

    userEvent.type(value, '35');
    expect(value).toHaveValue(35);
    userEvent.type(tag, 'Alimentação');
    expect(tag).toHaveValue('Alimentação');
  });

  it('Teste se é possivel adicionar uma despesa', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<Wallet />);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const btn = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '500');
    userEvent.type(description, 'churrasco');
    userEvent.click(btn);

    expect(value).toHaveValue(500);
    expect(description).toHaveValue('churrasco');
  });
});
