import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import App from '../App';
import { getInProgressRecipes } from '../services/localstorage';

const mealId = 52948;
const mealRoute = `/meals/${mealId}/in-progress`;

const drinkId = 17224;
const drinkRoute = `/drinks/${drinkId}/in-progress`;

const firstIngredientStep = '0-ingredient-step';
const finishRecipeBtn = 'finish-recipe-btn';

describe('Testes do componente RecipeInProgress para comida', () => {
  afterEach(() => vi.clearAllMocks());
  afterEach(() => vi.restoreAllMocks());

  test('Testa se o nome da receita de comida em progress, Wontons é renderizado', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    await waitFor(() => {
      const recipeInProgress = screen.getByText(/Recipe In Progress - Wontons/i);
      expect(recipeInProgress).toBeInTheDocument();
    });
  });

  test('Testa se o botão de Share é renderizado na tela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
  });

  test('Testa se o botão de Favorite é renderizado na tela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
  });

  test('Testa se as instruções da receita são renderizadas na tela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });

  test('Testa se é possível marcar as partes já feitas', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    await waitFor(() => {
      const recipeInProgress = screen.getByText(/Recipe In Progress - Wontons/i);
      expect(recipeInProgress).toBeInTheDocument();
    });

    const instructions = await screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const firstInstruction = screen.getByTestId(firstIngredientStep);
    const firstInstructionCheckbox = firstInstruction.getElementsByTagName('input')[0];

    await waitFor(() => {
      expect(firstInstructionCheckbox).not.toBeChecked();
    });

    await userEvent.click(firstInstructionCheckbox);
    expect(firstInstructionCheckbox).toBeChecked();
    expect(firstInstruction).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');

    await userEvent.click(firstInstructionCheckbox);
    expect(firstInstructionCheckbox).not.toBeChecked();
    expect(firstInstruction).not.toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
  });

  test('Testa se é possível finalizar a receita quando não existe receita finalizada', async () => {
    localStorage.clear();
    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    await waitFor(() => {
      const recipeInProgress = screen.getByText(/Recipe In Progress - Wontons/i);
      expect(recipeInProgress).toBeInTheDocument();
    });

    const instructions = await screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    await waitFor(() => {
      const firstInstruction = screen.getByTestId(firstIngredientStep);
      const firstInstructionCheckbox = firstInstruction.getElementsByTagName('input')[0];
      expect(firstInstructionCheckbox).not.toBeChecked();
    });

    const checkboxes = await screen.findAllByRole('checkbox');

    const promises = [];
    for (let i = 0; i < checkboxes.length; i++) {
      promises.push(userEvent.click(checkboxes[i]));
    }

    await Promise.all(promises);

    const finishBtn = await screen.findByTestId(finishRecipeBtn);
    expect(finishBtn).toBeEnabled();
    await userEvent.click(finishBtn);

    expect(await screen.getByTestId('page-title')).toHaveTextContent('Done Recipes');
    expect(await screen.getByTestId('0-horizontal-name')).toHaveTextContent('Wontons');
  });

  test('Testa se é possível finalizar a receita quando já existe receita finalizada', async () => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', '[]');
    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    await waitFor(() => {
      const recipeInProgress = screen.getByText(/Recipe In Progress - Wontons/i);
      expect(recipeInProgress).toBeInTheDocument();
    });

    const instructions = await screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    await waitFor(() => {
      const firstInstruction = screen.getByTestId(firstIngredientStep);
      const firstInstructionCheckbox = firstInstruction.getElementsByTagName('input')[0];
      expect(firstInstructionCheckbox).not.toBeChecked();
    });

    const checkboxes = await screen.findAllByRole('checkbox');

    const promises = [];
    for (let i = 0; i < checkboxes.length; i++) {
      promises.push(userEvent.click(checkboxes[i]));
    }

    await Promise.all(promises);

    const finishBtn = await screen.findByTestId(finishRecipeBtn);
    expect(finishBtn).toBeEnabled();
    await userEvent.click(finishBtn);

    expect(await screen.getByTestId('page-title')).toHaveTextContent('Done Recipes');
    expect(await screen.getByTestId('0-horizontal-name')).toHaveTextContent('Wontons');
  });

  test('Testa se o botão de compartilhar a receita funciona', async () => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: vi.fn(),
      },
      writable: true,
    });

    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    await userEvent.click(shareBtn);

    expect(await screen.getByText('Link copied!')).toBeInTheDocument();
  });

  test('Testa se o botão de favoritar a receita funciona', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');

    await userEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  });

  test('Testa se o botão de Finalizar Receita é renderizado na tela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    const finishButton = screen.getByTestId(finishRecipeBtn);
    expect(finishButton).toBeInTheDocument();
  });
});

describe('Testes do componente RecipeInProgress para bebida', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.clearAllMocks());
  afterEach(() => vi.restoreAllMocks());

  test('Testa se o nome da receita do drink em progress, Absolutely Fabulous é renderizado', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [drinkRoute] });

    await waitFor(() => {
      const recipeInProgress = screen.getByText(/Recipe In Progress - Absolutely Fabulous/i);
      expect(recipeInProgress).toBeInTheDocument();
    });
  });
});

describe('Testes do função getInProgressRecipes', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.clearAllMocks());
  afterEach(() => vi.restoreAllMocks());

  test('getInProgressRecipes retorna um objeto vazio quando não há receitas em andamento', () => {
    const inProgressRecipes = getInProgressRecipes();
    expect(inProgressRecipes).toEqual({ meals: {}, drinks: {} });
  });

  test('getInProgressRecipes retorna as receitas em andamento corretamente', () => {
    const inProgress = { meals: { 123: ['ingredient1', 'ingredient2'] }, drinks: {} };

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));

    const inProgressRecipes = getInProgressRecipes();
    expect(inProgressRecipes).toEqual(inProgress);
  });
});
