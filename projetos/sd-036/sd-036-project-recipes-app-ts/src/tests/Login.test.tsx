import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './RenderWith';

describe('Teste da página de Login ', () => {
  afterEach(() => vi.clearAllMocks());

  test('Verifica se o Email e o campo de input de email estão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const Email = screen.getByText(/email:/i);
    expect(Email).toBeInTheDocument();

    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i });
    expect(inputEmail).toBeInTheDocument();
  });

  test('Verifica se o Password e o campo de input de password estão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const password = screen.getByText(/password:/i);
    expect(password).toBeInTheDocument();

    const inputPassword = screen.getByLabelText(/password:/i);
    expect(inputPassword).toBeInTheDocument();
  });

  test('Verifica se o botão de login está na tela', () => {
    renderWithRouterAndRedux(<App />);

    const enterBtn = screen.getByRole('button', {
      name: /enter/i });
    expect(enterBtn).toBeInTheDocument();
  });

  test('Verifica se o botão de login está desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    const enterBtn = screen.getByRole('button', {
      name: /enter/i });
    expect(enterBtn).toBeDisabled();
  });

  test('Testa a validação de email e senha', async () => {
    const alertMock = vi.fn();
    window.alert = alertMock;

    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '1234567');

    expect(submitButton).toBeEnabled();

    await userEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('Login efetuado');

    const recipes = screen.getByRole('heading', {
      name: /recipes app/i,
    });

    expect(recipes).toBeInTheDocument();
  });
});
