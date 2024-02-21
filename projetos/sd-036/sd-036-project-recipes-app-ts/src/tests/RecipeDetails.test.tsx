import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './RenderWith';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';

async function mockMealRequests() {
  const MOCK_RESPONSE = {
    ok: true,
    status: 200,
    json: async () => drinks,
  } as Response;
  const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
}

async function mockDrinkRequests() {
  const MOCK_RESPONSE = {
    ok: true,
    status: 200,
    json: async () => meals,
  } as Response;
  const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
}

const mealId = 52977;
const mealRoute = `/meals/${mealId}`;
const drinkId = 15997;
const drinkRoute = `/drinks/${drinkId}`;
const startRecipeTestId = 'start-recipe-btn';

describe('Teste da página RecipeDetails ', () => {
  beforeEach(() => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => vi.clearAllMocks());
  afterEach(() => vi.restoreAllMocks());

  test('Verifica se os detalhes da receita de uma comida aparecem na tela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    await mockMealRequests();

    const photo = screen.getByTestId('recipe-photo');
    expect(photo.tagName).toBe('IMG');

    expect(screen.getByTestId('recipe-title')).toHaveTextContent('Corba');
    expect(screen.getByTestId('recipe-category')).toHaveTextContent('Side');
    expect(screen.getByTestId('0-ingredient-name-and-measure')).toHaveTextContent('Lentils 1 cup');
    expect(screen.getByTestId('1-ingredient-name-and-measure')).toHaveTextContent('Onion 1 large');
    expect(screen.getByTestId('2-ingredient-name-and-measure')).toHaveTextContent('Carrots 1 large');
    expect(screen.getByTestId('3-ingredient-name-and-measure')).toHaveTextContent('Tomato Puree 1 tbs');
    expect(screen.getByTestId('4-ingredient-name-and-measure')).toHaveTextContent('Cumin 2 tsp');
    expect(screen.getByTestId('5-ingredient-name-and-measure')).toHaveTextContent('Paprika 1 tsp');
    expect(screen.getByTestId('6-ingredient-name-and-measure')).toHaveTextContent('Mint 1/2 tsp');
    expect(screen.getByTestId('7-ingredient-name-and-measure')).toHaveTextContent('Thyme 1/2 tsp');
    expect(screen.getByTestId('8-ingredient-name-and-measure')).toHaveTextContent('Black Pepper 1/4 tsp');
    expect(screen.getByTestId('9-ingredient-name-and-measure')).toHaveTextContent('Red Pepper Flakes 1/4 tsp');
    expect(screen.getByTestId('10-ingredient-name-and-measure')).toHaveTextContent('Vegetable Stock 4 cups');
    expect(screen.getByTestId('11-ingredient-name-and-measure')).toHaveTextContent('Water 1 cup');
    expect(screen.getByTestId('12-ingredient-name-and-measure')).toHaveTextContent('Sea Salt Pinch');

    const shareButton = screen.getByTestId('share-btn');
    const linkCopiedText = screen.getByText('Link copied!');
    expect(linkCopiedText).not.toBeVisible();
    await userEvent.click(shareButton);
    await waitFor(() => {
      expect(linkCopiedText).not.toHaveClass('d-none');
    });

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    await userEvent.click(favoriteButton);
    await waitFor(() => {
      expect(favoriteButton).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
    });

    const startRecipeButton = screen.getByTestId(startRecipeTestId);
    expect(startRecipeButton).toHaveTextContent('Start Recipe');
  });

  test('Verifica se os detalhes da receita de uma bebida aparecem na tela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [drinkRoute] });

    await waitFor(async () => {
      await mockDrinkRequests();
    });

    const photo = screen.getByTestId('recipe-photo');
    expect(photo.tagName).toBe('IMG');

    expect(screen.getByTestId('recipe-title')).toHaveTextContent('GG');
    expect(screen.getByTestId('recipe-category')).toHaveTextContent('Ordinary Drink Optional alcohol');
    expect(screen.getByTestId('0-ingredient-name-and-measure')).toHaveTextContent('Galliano 2 1/2 shots');
    expect(screen.getByTestId('1-ingredient-name-and-measure')).toHaveTextContent('Ginger ale');
    expect(screen.getByTestId('2-ingredient-name-and-measure')).toHaveTextContent('Ice');

    expect(screen.getByTestId(startRecipeTestId)).toHaveTextContent('Start Recipe');
  });

  test('Verifica se o botao de iniciar a receita tem o texto correto para comida', async () => {
    const inProgressRecipes = {
      meals: {
        [mealId]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    await waitFor(async () => {
      await mockMealRequests();
    });

    expect(screen.getByTestId(startRecipeTestId)).toHaveTextContent('Continue Recipe');

    localStorage.clear();
  });

  test('Verifica se o botao de iniciar a receita tem o texto correto para bebida', async () => {
    const inProgressRecipes = {
      drinks: {
        [drinkId]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    renderWithRouterAndRedux(<App />, { initialEntries: [drinkRoute] });

    await waitFor(async () => {
      await mockDrinkRequests();
    });

    expect(screen.getByTestId(startRecipeTestId)).toHaveTextContent('Continue Recipe');

    localStorage.clear();
  });

  // test('Verifica se o botao de iniciar a receita nao aparece quando a receita ja concluida para comida', async () => {
  //   const doneRecipes = [{ id: mealId, type: 'meal' }];
  //   localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

  //   renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

  //   await waitFor(async () => {
  //     await mockMealRequests();
  //   });

  //   expect(screen.queryByTestId(startRecipeTestId)).not.toBeInTheDocument();

  //   localStorage.clear();
  // });

  // test('Verifica se o botao de iniciar a receita nao aparece quando a receita ja concluida para bebida', async () => {
  //   const doneRecipes = [{ id: drinkId, type: 'drink' }];
  //   localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

  //   renderWithRouterAndRedux(<App />, { initialEntries: [drinkRoute] });

  //   await waitFor(async () => {
  //     await mockDrinkRequests();
  //   });

  //   expect(screen.queryByTestId(startRecipeTestId)).not.toBeInTheDocument();

  //   localStorage.clear();
  // });
});
