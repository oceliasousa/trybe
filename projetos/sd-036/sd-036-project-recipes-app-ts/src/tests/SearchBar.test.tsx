import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { waitFor } from '@testing-library/dom';
import { renderWithRouterAndRedux } from './RenderWith';
import Meals from '../Components/Meals';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import Drinks from '../Components/Drinks';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';

const allCategories = 'All-category-filter';
const famousTea = '3-Mile Long Island Iced Tea';
const ordinaryCategory = 'Ordinary Drink-category-filter';
const searchBtn = 'exec-search-btn';
const searchTopBtn = 'search-top-btn';
const searchInputBtn = 'search-input';
const searchNameRadio = 'name-search-radio';

window.alert = vi.fn();

describe('Testes do componente SearchBar', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se ao clicar no ícone de search o campo de input, e os buttons de ingrediente, nome e primeira letra aparecem na tela', async () => {
    renderWithRouterAndRedux(<Meals />);

    const searchIcon = screen.getByRole('img', {
      name: /search/i });

    await userEvent.click(searchIcon);

    const inputText = screen.getByRole('textbox');
    const ingredientRadio = screen.getByRole('radio', {
      name: /ingrediente/i });
    const nameRadio = screen.getByRole('radio', {
      name: /nome/i });
    const firstLetterRadio = screen.getByRole('radio', {
      name: /primeira letra/i });

    expect(inputText).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });

  test('Testa se o botão de Buscar está na tela', () => {
    renderWithRouterAndRedux(<Meals />);

    const btnSearch = screen.getByTestId(searchTopBtn);
    expect(btnSearch).toBeInTheDocument();
  });
});

describe('Testes da SearchBar para comidas', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se ao buscar comida pela categoria, o resultado é renderizado na tela', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<Meals />);

    const breakfastCategory = await screen.findByTestId('Breakfast-category-filter');
    expect(breakfastCategory).toBeInTheDocument();
    userEvent.click(breakfastCategory);

    const imageAlt = await screen.findByAltText('English Breakfast');
    expect(imageAlt).toBeInTheDocument();
  });

  test('Testa se ao buscar clicar no botão ALL, o resultado da busca anterior de categoria de comida é subtituido pelas receitas sem filtro', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<Meals />);

    const chickenCategory = await screen.findByTestId('Chicken-category-filter');
    expect(chickenCategory).toBeInTheDocument();

    await userEvent.click(chickenCategory);

    const imageAltChicken = await screen.findByAltText('Brown Stew Chicken');
    expect(imageAltChicken).toBeInTheDocument();

    const AllBtn = screen.getByTestId(allCategories);
    expect(AllBtn).toBeInTheDocument();

    await userEvent.click(AllBtn);

    const imgAlt = await screen.findByAltText('Corba');
    expect(imgAlt).toBeInTheDocument();
  });

  test('Testa se ao buscar comida por ingrediente, o resultado é renderizado na tela', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => chickenMeals,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    renderWithRouterAndRedux(<Meals />);

    const searchIcon = screen.getByRole('img', {
      name: /search/i });

    await userEvent.click(searchIcon);

    const inputText = screen.getByRole('textbox');
    const ingredientRadio = screen.getByRole('radio', {
      name: /ingrediente/i });

    await userEvent.type(inputText, 'chicken');
    await userEvent.click(ingredientRadio);

    const searchButton = screen.getByTestId(searchBtn);
    await userEvent.click(searchButton);

    await waitFor(() => {
      const imgBrownStewChicken = screen.queryByAltText('Brown Stew Chicken');
      expect(imgBrownStewChicken).toBeInTheDocument();
    });
  });

  test('Testa se ao buscar comida por nome, o resultado é renderizado na tela', async () => {
    const MOCK_RESPONSE_NAME = {
      ok: true,
      status: 200,
      json: async () => breakfastMeals,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE_NAME);

    renderWithRouterAndRedux(<Meals />);

    const searchIcon = screen.getByRole('img', {
      name: /search/i });

    await userEvent.click(searchIcon);

    const inputText = screen.getByRole('textbox');
    const ingredientRadio = screen.getByRole('radio', {
      name: /nome/i });

    await userEvent.type(inputText, 'bread');
    await userEvent.click(ingredientRadio);

    const btn = screen.getByRole('button', {
      name: /buscar/i });
    await userEvent.click(btn);

    await waitFor(() => {
      const englishBreakfast = screen.queryByAltText('English Breakfast');
      expect(englishBreakfast).toBeInTheDocument();
    });
  });

  test('Testa se ao buscar comida pela primeira letra, o resultado é renderizado na tela', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => chickenMeals,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    renderWithRouterAndRedux(<Meals />);

    const searchIcon = screen.getByRole('img', {
      name: /search/i });

    await userEvent.click(searchIcon);

    const inputText = screen.getByRole('textbox');
    const ingredientRadio = screen.getByRole('radio', {
      name: /Primeira Letra/i });

    await userEvent.type(inputText, 'c');
    await userEvent.click(ingredientRadio);

    const button = screen.getByTestId(searchBtn);
    await userEvent.click(button);

    await waitFor(() => {
      const chickenEnchilada = screen.queryByAltText('Chicken Enchilada Casserole');
      expect(chickenEnchilada).toBeInTheDocument();
    });
  });
});

describe('Testes da SearchBar para bebidas', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se ao buscar drinks por nome, o resultado é renderizado na tela', async () => {
    const MOCK_RESPONSE_DRINKSNAME = {
      ok: true,
      status: 200,
      json: async () => cocoaDrinks,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE_DRINKSNAME);

    renderWithRouterAndRedux(<Drinks />);

    const searchIcon = screen.getByRole('img', {
      name: /search/i });

    await userEvent.click(searchIcon);

    await waitFor(() => {
      const inputText = screen.getByRole('textbox');
      const ingredientRadio = screen.getByRole('radio', {
        name: /nome/i });
      userEvent.type(inputText, 'chocolate');
      userEvent.click(ingredientRadio);
    });

    const search = screen.getByTestId(searchBtn);
    await userEvent.click(search);

    await waitFor(() => {
      const drinkByName = screen.queryByAltText('Castillian Hot Chocolate');
      expect(drinkByName).toBeInTheDocument();
    });
  });

  test('Testa se ao buscar bebida pela categoria, o resultado é renderizado na tela', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<Drinks />);

    const ordinayCategory = await screen.findByTestId(ordinaryCategory);
    expect(ordinayCategory).toBeInTheDocument();
    userEvent.click(ordinayCategory);

    const imageAlt = await screen.findByAltText(famousTea);
    expect(imageAlt).toBeInTheDocument();
  });

  test('Testa se ao buscar clicar no botão ALL, o resultado da busca anterior de categoria de drinks é subtituido pelas receitas sem filtro', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<Drinks />);

    const category = await screen.findByTestId(ordinaryCategory);
    expect(category).toBeInTheDocument();
    userEvent.click(category);

    const imageAlt = await screen.findByAltText(famousTea);
    expect(imageAlt).toBeInTheDocument();

    const AllCategoryBtn = screen.getByTestId(allCategories);
    expect(AllCategoryBtn).toBeInTheDocument();
    userEvent.click(AllCategoryBtn);

    const imageAltAll = await screen.findByAltText('A1');
    expect(imageAltAll).toBeInTheDocument();
  });

  test('Testa se ao buscar bebida pela categoria, o resultado é renderizado na tela', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<Drinks />);

    const ordinayFilter = await screen.findByTestId(ordinaryCategory);
    expect(ordinayFilter).toBeInTheDocument();
    userEvent.click(ordinayFilter);

    const imageAlt = await screen.findByAltText(famousTea);
    expect(imageAlt).toBeInTheDocument();
  });

  test('Testa se ao buscar clicar no botão ALL, o resultado da busca anterior de categoria de drinks é subtituido pelas receitas sem filtro', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<Drinks />);

    const ordinary = await screen.findByTestId(ordinaryCategory);
    expect(ordinary).toBeInTheDocument();
    userEvent.click(ordinary);

    const imageAlt = await screen.findByAltText(famousTea);
    expect(imageAlt).toBeInTheDocument();

    const AllCategoryBtn = screen.getByTestId(allCategories);
    expect(AllCategoryBtn).toBeInTheDocument();
    userEvent.click(AllCategoryBtn);

    const imageAltAll = await screen.findByAltText('A1');
    expect(imageAltAll).toBeInTheDocument();
  });

  test('Testa se ao buscar por um termo inválido, um alerta é renderizado na tela ', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);
    vi.spyOn(window, 'alert');

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const btn = await screen.findByTestId(searchTopBtn);
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);

    const searchInput = await screen.findByTestId(searchInputBtn);
    expect(searchInput).toBeInTheDocument();
    await userEvent.type(searchInput, 'xablau');

    const searchByName = await screen.findByTestId(searchNameRadio);
    expect(searchByName).toBeInTheDocument();
    await userEvent.click(searchByName);

    const buscarBtn = await screen.findByTestId(searchBtn);
    expect(buscarBtn).toBeInTheDocument();
    await userEvent.click(buscarBtn);

    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  test('Testa se ao buscar clicar em uma receita de drink, sou redirecionada para a tela de detalhes', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const btn = await screen.findByTestId(searchTopBtn);
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);

    const searchByName = await screen.findByTestId(searchNameRadio);
    expect(searchByName).toBeInTheDocument();
    await userEvent.click(searchByName);

    const searchInput = await screen.findByTestId(searchInputBtn);
    expect(searchInput).toBeInTheDocument();
    await userEvent.type(searchInput, 'Aquamarine');

    const buscarBtn = await screen.findByTestId(searchBtn);
    expect(buscarBtn).toBeInTheDocument();
    await userEvent.click(buscarBtn);

    expect(await screen.findByRole('heading', { name: /recipe details/i, level: 1 })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /aquamarine/i, level: 2 })).toBeInTheDocument();
  });

  test('Testa se ao buscar clicar em uma receita de meal, sou redirecionada para a tela de detalhes', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const btn = await screen.findByTestId(searchTopBtn);
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);

    const searchByName = await screen.findByTestId(searchNameRadio);
    expect(searchByName).toBeInTheDocument();
    await userEvent.click(searchByName);

    const searchInput = await screen.findByTestId(searchInputBtn);
    expect(searchInput).toBeInTheDocument();
    await userEvent.type(searchInput, 'Arrabiata');

    const buscarBtn = await screen.findByTestId(searchBtn);
    expect(buscarBtn).toBeInTheDocument();
    await userEvent.click(buscarBtn);

    expect(await screen.findByRole('heading', { name: /recipe details/i, level: 1 })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /arrabiata/i, level: 2 })).toBeInTheDocument();
  });
});
