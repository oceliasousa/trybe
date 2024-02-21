import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

afterEach(() => jest.clearAllMocks());

describe('test login page', () => {
  test('test invalid login', () => {
    const { store, history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonInput = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'invalidemail');
    userEvent.type(passwordInput, '');
    userEvent.click(buttonInput);
    expect(buttonInput).toBeDisabled();

    expect(store.getState().user.email).toEqual('');
  });

  test('test invalid login', () => {
    const { store, history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonInput = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'valid@email.com');
    userEvent.type(passwordInput, '123');
    userEvent.click(buttonInput);
    expect(buttonInput).toBeDisabled();

    expect(store.getState().user.email).toEqual('');
  });

  test('test valid login', () => {
    const { store, history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonInput = screen.getByTestId('btn-play');

    act(() => {
      userEvent.type(emailInput, 'valid@email.com');
      userEvent.type(passwordInput, '123456');
      userEvent.click(buttonInput);
    });

    expect(store.getState().user.email).toEqual('valid@email.com');
    expect(history.location.pathname).toEqual('/carteira');
  });
});
