import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './RenderWith';
import Meals from '../Components/Meals';
import App from '../App';

// const fetch = require('../../cypress/mocks/fetch');

(window as any).scrollTo = vi.fn();

describe('Testes do componente Header', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se o ícone do app de receitas está na tela', () => {
    renderWithRouterAndRedux(<Meals />);

    const icone = screen.getByRole('img', {
      name: /icone do aplicativo de receitas/i });
    expect(icone).toBeInTheDocument();
  });

  test('Testa se o texto Recipes app e Meals está na tela', () => {
    renderWithRouterAndRedux(<Meals />);

    const recipeText = screen.getByRole('heading', {
      name: /recipes app/i });
    const mealsText = screen.getByRole('heading', {
      name: /meals/i });
    expect(recipeText).toBeInTheDocument();
    expect(mealsText).toBeInTheDocument();
  });

  test('Testa se os ícones de search e profile estão na tela', () => {
    renderWithRouterAndRedux(<Meals />);

    const searchIcon = screen.getByRole('img', {
      name: /search/i });
    const profileIcon = screen.getByRole('img', {
      name: /profile/i });
    expect(searchIcon).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });

  test('Testa se ao clicar no ícone de profile o usuário é direcionado para a página profile', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const profileIcon = screen.getByTestId('profile-top-btn');

    await userEvent.click(profileIcon);

    await waitFor(() => {
      const profileText = screen.getByRole('heading', {
        name: /profile/i });
      expect(profileText).toBeInTheDocument();
    });
  });
});
