import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import mockData from './helpers/mockData';

import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

afterEach(() => jest.clearAllMocks());

describe('test wallet page', () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  }));
  test('test add expense', async () => {
    const { store, history } = renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const buttonInput = screen.getByTestId('add-btn');

    expect(value).toBeDefined();
    expect(description).toBeDefined();
    expect(currency).toBeDefined();
    expect(method).toBeDefined();
    expect(tag).toBeDefined();
    expect(buttonInput).toBeDefined();

    userEvent.type(value, '50');
    userEvent.type(description, 'my description');
    userEvent.click(await buttonInput);

    // expect(screen.getByTestId('delete-btn')).toBeDefined();
    // expect(screen.getByTestId('edit-btn')).toBeDefined();
    // expect(screen.findByText('50')).toBeDefined();
    // expect(screen.findByText('my description')).toBeDefined();
    // expect(value).toHaveValue('');
    // expect(description).toHaveValue('');

    expect(store.getState().wallet.expenses).toHaveLength(1);
  });
});
