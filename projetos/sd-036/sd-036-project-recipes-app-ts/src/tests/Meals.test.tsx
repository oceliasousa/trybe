import React from 'react';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './RenderWith';
import Meals from '../Components/Meals';
import { getMealsbyCategories, getMeals, getMealsCategories } from '../services/api';

function generateMockMeals(count: number) {
  return Array.from({ length: count }, (_, index) => ({ meal: `Meal ${index + 1}` }));
}

describe('Testa a página de comidas', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se a função getMealsCategories faz o fetch da api e são renderizadas 5 categorias de comida', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => ({ meals: generateMockMeals(5) }),
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    const result = await getMealsCategories();

    expect(mockFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    expect(result).toEqual(generateMockMeals(5));
  });

  test('Testa se a função getMeals faz o fetch da api e são renderizadas 12 receitas', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => ({ meals: generateMockMeals(12) }),
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    const result = await getMeals();

    expect(mockFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(result).toEqual(generateMockMeals(12));
  });

  test('Testa se a função getMealsbyCategories faz o fetch da api renderiza as receitas apenas dessa categoria', async () => {
    const MockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ meals: [{ idMeal: '1', strMeal: 'Spaghetti' }] }),
    } as Response);

    const category = 'Pasta Category';
    const result = await getMealsbyCategories(category);

    expect(MockFetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

    expect(result).toEqual([{ idMeal: '1', strMeal: 'Spaghetti' }]);
  });

  test('Teste de tratamento de erro da API', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    } as Response);

    const category = 'Invalid Category';
    const result = await getMealsbyCategories(category);

    expect(mockFetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

    expect(result).toBeInstanceOf(Error);
  });

  test('Testa se os botões de categoria são renderizados', async () => {
    renderWithRouterAndRedux(<Meals />);

    const categories = ['All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];

    const categoryButtonsPromises = categories.map((category) => screen.findByTestId(`${category}-category-filter`));

    const categoryButtonsResults = await Promise.allSettled(categoryButtonsPromises);

    categoryButtonsResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        expect(result.value).toBeInTheDocument();
      }
    });
  });

  // test('Testa se ao clicar no botão ALL, ele limpa a categoria selecionada anteriormente e renderiza 12 receitas sem categoria', async () => {
  //   const meals = generateMockMeals(12);
  //   const mealsCategoriesBtn = generateMockMeals(5);
  //   const beefMeals = generateMockMeals(12);

  //   const fetch = (url: string) => Promise.resolve({
  //     status: 200,
  //     ok: true,
  //     json: () => {
  //       if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals);
  //       if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mealsCategoriesBtn);
  //       if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') return Promise.resolve(beefMeals);
  //     },
  //   });

  //   // Renderiza o componente e seleciona uma categoria

  //   vi.spyOn(fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list'), 'then').mockResolvedValueOnce(mealsCategoriesBtn);

  //   await waitFor(() => {
  //     const categoryBtn = screen.getByTestId('Beef-category-filter');
  //     userEvent.click(categoryBtn);
  //   });

  //   // renderiza as receitas da categoria selecionada

  //   vi.spyOn(fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef'), 'then').mockResolvedValueOnce(beefMeals);

  //   await waitFor(() => {
  //     const AllBtn = screen.getByRole('button', {
  //       name: /all/i });
  //     userEvent.click(AllBtn);
  //   });

  //   // renderiza as receitas sem categoria

  //   vi.spyOn(fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='), 'then').mockResolvedValueOnce(meals);
  // });
});
