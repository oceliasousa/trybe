import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import App from '../App';

const mealItem = {
  alcoholicOrNot: '',
  category: 'Beef',
  doneDate: '2024-02-01T04:53:29.055Z',
  id: '53069',
  image: 'https://www.themealdb.com/images/media/meals/4pqimk1683207418.jpg',
  name: 'Bistek',
  nationality: 'Filipino',
  tags: [],
  type: 'meal',
};
const drinkItem = {
  alcoholicOrNot: 'Alcoholic',
  category: 'Cocktail',
  doneDate: '2024-02-01T04:53:46.538Z',
  id: '17222',
  image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  name: 'A1',
  nationality: '',
  tags: [],
  type: 'drink',
};

const pathName = '/favorite-recipes';
const imgEl0 = '0-horizontal-image';
const nameEl0 = '0-horizontal-name';
const imgEl1 = '1-horizontal-image';
const nameEl1 = '1-horizontal-name';

describe('Testes FavoriteRecipes', () => {
  beforeEach(() => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: vi.fn(),
      },
      writable: true,
    });
  });

  test('Verifica se a pagina é renderizada com os botões', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [pathName] });

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  test('Verifica se a pagina é renderizada com os componentes do localStorage', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([mealItem, drinkItem]));
    renderWithRouterAndRedux(<App />, { initialEntries: [pathName] });

    expect(screen.getByTestId(imgEl0)).toBeInTheDocument();
    expect(screen.getByTestId(nameEl0)).toBeInTheDocument();
    expect(screen.getByTestId(imgEl1)).toBeInTheDocument();
    expect(screen.getByTestId(nameEl1)).toBeInTheDocument();

    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  });

  test('Verifica se existe mensagens "Link copied!", e se sao visiveis quando quando clicados no botão', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([mealItem, drinkItem]));
    renderWithRouterAndRedux(<App />, { initialEntries: [pathName] });

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    const shareBtn2 = screen.getByTestId('1-horizontal-share-btn');
    const msgElements = screen.getAllByText('Link copied!');
    expect(msgElements).toHaveLength(2);

    await userEvent.click(shareBtn);
    expect(msgElements[0]).toBeVisible();
    await userEvent.click(shareBtn2);
    expect(msgElements[0]).toHaveClass('d-none');

    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  });

  test('Verifica o funcionamento dos botões de filtro', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([mealItem, drinkItem]));
    renderWithRouterAndRedux(<App />, { initialEntries: [pathName] });

    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');

    await userEvent.click(mealBtn);
    expect(screen.getByTestId(imgEl0)).toBeInTheDocument();
    expect(screen.getByTestId(nameEl0)).toHaveTextContent('Bistek');

    await userEvent.click(drinkBtn);
    expect(screen.getByTestId(imgEl0)).toBeInTheDocument();
    expect(screen.getByTestId(nameEl0)).toHaveTextContent('A1');

    await userEvent.click(allBtn);
    expect(screen.getByTestId(nameEl0)).toHaveTextContent('Bistek');
    expect(screen.getByTestId(nameEl1)).toHaveTextContent('A1');

    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  });

  test('Verifica se o botão de desfavoritar funciona corretamente', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([mealItem, drinkItem]));
    renderWithRouterAndRedux(<App />, { initialEntries: [pathName] });

    const unfavBtn = screen.getByTestId('0-horizontal-favorite-btn');
    await userEvent.click(unfavBtn);

    expect(screen.getByTestId(nameEl0)).toHaveTextContent('A1');
  });
});
