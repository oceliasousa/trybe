import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import Meals from '../Components/Meals';
import App from '../App';
import Profile from '../pages/Profile';

describe('Testes do componente Footer', () => {
  test('Testa se os ícones de comida e bebida estão  no menu inferior', () => {
    renderWithRouterAndRedux(<Meals />);

    const drinkIcon = screen.getByRole('img', {
      name: /drinks/i });
    const mealIcon = screen.getByRole('img', {
      name: /meals/i });
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  test('Testa se ao clicar no ícone de bebida a partir da página meals sou redirecionada para a rota "/drinks"', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    await userEvent.click(drinkIcon);

    const drinkText = screen.getByRole('heading', {
      name: /drinks/i });

    await waitFor(() => {
      expect(drinkText).toBeInTheDocument();
    });
  });

  test('Testa se ao clicar no ícone de comida a partir da página drinks sou redirecionada para a rota "/meals"', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const mealIcon = screen.getByTestId('meals-bottom-btn');
    await userEvent.click(mealIcon);

    const mealsText = screen.getByRole('heading', {
      name: /meals/i });

    await waitFor(() => {
      expect(mealsText).toBeInTheDocument();
    });
  });

  test('Testa se os ícones de comida e bebida estão  no menu inferior da página Profile', () => {
    renderWithRouterAndRedux(<Profile />);

    const drinkIcon = screen.getByRole('img', {
      name: /drinks/i });
    const mealIcon = screen.getByRole('img', {
      name: /meals/i });
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });
});
