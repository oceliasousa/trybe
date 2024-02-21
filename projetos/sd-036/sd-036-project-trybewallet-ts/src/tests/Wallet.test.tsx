import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import { RootState } from '../types';

const initialState = {
  user: {
    email: 'teste@test.com',
  },
  wallet: {
    currencies: Object.keys(mockData),
    expenses: [{
      id: 0,
      exchangeRates: mockData,
      value: '50',
      currency: 'USD',
      description: 'my description',
      tag: 'my tag',
      method: 'my method',
    }],
    editingId: null,
  },
} as RootState;

const valueTestId = 'value-input';
const descriptionTestId = 'description-input';
const currencyTestId = 'currency-input';
const totalTestId = 'total-field';

beforeAll(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({ json: async () => mockData } as Response);
});

describe('Wallet Component', () => {
  test('renders correctly', () => {
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState });

    expect(screen.getByTestId(valueTestId)).toBeInTheDocument();
    expect(screen.getByTestId(descriptionTestId)).toBeInTheDocument();
    expect(screen.getByTestId(currencyTestId)).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-btn')).toHaveTextContent('Adicionar despesa');
    expect(screen.getByTestId(totalTestId)).toHaveTextContent('237.66');
  });

  test('renders existing expense correctly', () => {
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState });

    expect(screen.getByText('50.00')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('my description')).toBeInTheDocument();
    expect(screen.getByText('my tag')).toBeInTheDocument();
    expect(screen.getByText('my method')).toBeInTheDocument();
  });

  test('loads currencies correctly from the endpoint', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState });

    ['USD'].forEach((currency) => {
      expect(screen.getByDisplayValue(currency)).toBeInTheDocument();
    });
  });

  test('adds first expense', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState: {} });

    const valueInput = screen.getByTestId(valueTestId);
    const descriptionInput = screen.getByTestId(descriptionTestId);
    const currencyInput = screen.getByTestId(currencyTestId);

    await userEvent.type(valueInput, '50');
    await userEvent.type(descriptionInput, 'description');
    await userEvent.selectOptions(currencyInput, 'CAD');
    expect(valueInput).toHaveValue(50);
    expect(descriptionInput).toHaveValue('description');
    expect(currencyInput).toHaveValue('CAD');

    await userEvent.click(screen.getByTestId('add-btn'));

    expect(valueInput).toHaveValue(null);
    expect(descriptionInput).toHaveValue('');

    expect(screen.getByTestId(totalTestId)).toHaveTextContent('187.79');
    expect(store.getState().wallet.expenses).toHaveLength(1);
  });

  test('adds a new expense', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState });

    const valueInput = screen.getByTestId(valueTestId);
    const descriptionInput = screen.getByTestId(descriptionTestId);
    const currencyInput = screen.getByTestId(currencyTestId);

    await userEvent.type(valueInput, '50');
    await userEvent.type(descriptionInput, 'description');
    await userEvent.selectOptions(currencyInput, 'CAD');
    expect(valueInput).toHaveValue(50);
    expect(descriptionInput).toHaveValue('description');
    expect(currencyInput).toHaveValue('CAD');

    await userEvent.click(screen.getByTestId('add-btn'));

    expect(valueInput).toHaveValue(null);
    expect(descriptionInput).toHaveValue('');

    expect(screen.getByTestId(totalTestId)).toHaveTextContent('425.45');
    expect(store.getState().wallet.expenses).toHaveLength(2);
  });

  test('edits an existing expense', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState });

    const valueInput = screen.getByTestId(valueTestId);
    const descriptionInput = screen.getByTestId(descriptionTestId);
    const currencyInput = screen.getByTestId(currencyTestId);

    await userEvent.click(screen.getByTestId('edit-btn'));

    await userEvent.clear(valueInput);
    await userEvent.type(valueInput, '100');
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'other description');
    await userEvent.selectOptions(currencyInput, 'CAD');
    expect(valueInput).toHaveValue(100);
    expect(descriptionInput).toHaveValue('other description');
    expect(currencyInput).toHaveValue('CAD');

    await userEvent.click(screen.getByText(/editar despesa/i));

    expect(valueInput).toHaveValue(null);
    expect(descriptionInput).toHaveValue('');

    expect(screen.getByTestId(totalTestId)).toHaveTextContent('375.59');
    expect(store.getState().wallet.expenses).toHaveLength(1);
    expect(store.getState().wallet.expenses[0].value).toEqual('100');
  });

  test('delete an existing expense', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState });

    await userEvent.click(screen.getByTestId('delete-btn'));

    expect(screen.getByTestId(totalTestId)).toHaveTextContent('0.00');
    expect(store.getState().wallet.expenses).toHaveLength(0);
  });
});
