import { vi } from 'vitest';
import { getRecipesByIngredients, getRecipesByName, getRecipesByFirstLetter, getMealsCategories, getMeals, getRecipesById, validateApi, getDrinks, getDrinksByIngredient, getDrinksByName, getDrinksByFirstLetter, getDrinksById, validateApiDrinks, getDrinksCategories } from '../services/api';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import meals from '../../cypress/mocks/meals';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';
import drinks from '../../cypress/mocks/drinks';

const mockResponseNotFound = {
  ok: false,
  statusText: 'Not Found',
} as Response;

window.alert = vi.fn();

describe('Testes para respostas de requisição a API de comida por ingrediente', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se a api de busca de comida por ingrediente é chamada corretamente', async () => {
    const MOCK_RESPONSE_MI = {
      ok: true,
      status: 200,
      json: async () => mealIngredients,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE_MI);
    const ingredient = 'chicken';
    const result = await getRecipesByIngredients(ingredient);

    expect(mockFetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    expect(result).toEqual(result);
  });

  test('Testa o resultado mal sucedido da API de busca de comida por ingrediente', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponseNotFound);

    const ingredient = 'invalidIngredient';
    const resultRecipesByIngredient = await getRecipesByIngredients(ingredient);

    expect(resultRecipesByIngredient).toEqual(new Error('Not Found'));
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  });
});

describe('Testes para respostas de requisição a API de comida por nome', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se a api de busca de comida por nome é chamada corretamente', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => meals,
    } as Response;

    const mockFetchMeals = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    const name = 'Beef and Mustard Pie';
    const result = await getRecipesByName(name);

    expect(mockFetchMeals).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    expect(result).toEqual(result);
  });

  test('Testa o resultado mal sucedido da API de busca de comida por nome', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponseNotFound);

    const name = 'invalidName';
    const result = await getRecipesByName(name);

    expect(result).toEqual(new Error('Not Found'));
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  });
});

describe('Testes para respostas de requisição a API de comida por primeira letra', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se a api de busca de comida por primeira letra é chamada corretamente', async () => {
    const MOCK_RESPONSE_FL = {
      ok: true,
      status: 200,
      json: async () => meals,
    } as Response;

    const mockFetchFirstLetter = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE_FL);
    const letter = 'c';
    const result = await getRecipesByFirstLetter(letter);

    expect(mockFetchFirstLetter).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    expect(result).toEqual(result);
  });

  test('Testa o resultado mal sucedido da API de busca de comida por primeira letra', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponseNotFound);

    const letter = 'invalidLetter';
    const result = await getRecipesByFirstLetter(letter);

    expect(result).toEqual(new Error('Not Found'));
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  });

  test('Testa o resultado mal sucedido da API de busca de comida por primeira letra', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponseNotFound);

    const letter = 'invalidLetter';
    const result = await getRecipesByFirstLetter(letter);

    expect(result).toEqual(new Error('Not Found'));
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  });
});

describe('Testes para respostas de requisição a API de comida por id', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se a api de busca de comida por id é chamada corretamente', async () => {
    const MOCK_BY_ID = {
      ok: true,
      status: 200,
      json: async () => meals,
    } as Response;

    const mockFetchById = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_BY_ID);
    const id = '52977';
    const resultGetById = await getRecipesById(id);

    expect(mockFetchById).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    expect(resultGetById).toEqual(resultGetById);
  });

  test('Testa o resultado mal sucedido da API de busca de comida por id', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponseNotFound);

    const idInvalid = 'invalidId';
    const result = await getRecipesById(idInvalid);

    expect(result).toEqual(new Error('Not Found'));
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idInvalid}`);
  });
});

describe('Testes para respostas de requisição a API de bebida por ingrediente', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se a api de busca de drink por ingrediente é chamada corretamente', async () => {
    const MOCK_RESPONSE_D = {
      ok: true,
      status: 200,
      json: async () => drinkIngredients,
    } as Response;

    const mockFetchGetDrinksByIngredients = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE_D);
    const ingredient = 'Applejack';
    const result = await getDrinksByIngredient(ingredient);

    expect(mockFetchGetDrinksByIngredients).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    expect(result).toEqual(result);
  });

  test('Testa o resultado mal sucedido da API de busca de drink por ingrediente', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponseNotFound);

    const ingredient = 'invalidIngredient';
    const result = await getDrinksByIngredient(ingredient);

    expect(result).toEqual(new Error('Not Found'));
    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  });
});

describe('Testes para respostas de requisição a API de bebida por nome', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se a api de busca de drink por nome é chamada corretamente', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => drinkIngredients,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    const name = 'Casa Blanca';
    const result = await getDrinksByName(name);

    expect(mockFetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    expect(result).toEqual(result);
  });

  test('Testa o resultado mal sucedido da API de busca de drink por nome', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponseNotFound);

    const name = 'invalidName';
    const result = await getDrinksByName(name);

    expect(result).toEqual(new Error('Not Found'));
    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  });
});

describe('Testes para respostas de requisição a API de bebida por primeira letra', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se a api de busca de drink por primeira letra é chamada corretamente', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => drinks,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    const letter = 'c';
    const result = await getDrinksByFirstLetter(letter);

    expect(mockFetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
    expect(result).toEqual(result);
  });

  test('Testa o resultado mal sucedido da API de busca de drink por primeira letra', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponseNotFound);

    const letter = 'invalidLetter';
    const result = await getDrinksByFirstLetter(letter);

    expect(result).toEqual(new Error('Not Found'));
    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  });

  test('Testa o tratamento de resposta não bem-sucedida da API de bebida', async () => {
    const mockResponse = {
      ok: false,
      statusText: 'Not Found',
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const result = await getDrinks();

    expect(result).toEqual(new Error('Not Found'));
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
});

describe('Testes para respostas de requisição a API de drinks por id', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se a api de busca de comida por id é chamada corretamente', async () => {
    const MOCK_DRINK_BY_ID = {
      ok: true,
      status: 200,
      json: async () => drinks,
    } as Response;

    const mockFetchDrinkById = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_DRINK_BY_ID);
    const idDrink = '13501';
    const resultGetDrinkById = await getDrinksById(idDrink);

    expect(mockFetchDrinkById).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
    expect(resultGetDrinkById).toEqual(resultGetDrinkById);
  });

  test('Testa o resultado mal sucedido da API de busca de comida por id', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponseNotFound);

    const idDrinkInvalid = 'invalidId';
    const resultDrinkInvalid = await getDrinksById(idDrinkInvalid);

    expect(resultDrinkInvalid).toEqual(new Error('Not Found'));
    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrinkInvalid}`);
  });
});

describe('Testes para validateApi', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa a chamada de getRecipesByIngredients', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mealIngredients,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const ingredient = 'chicken';
    const result = await validateApi('ingredient', ingredient);

    expect(result).toEqual(result);
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  });

  test('Testa a chamada de getRecipesByName', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => meals,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const name = 'Beef and Mustard Pie';
    const result = await validateApi('name', name);

    expect(result).toEqual(result);
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  });

  test('Testa a chamada de getRecipesByFirstLetter', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => meals,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const letter = 'c';
    const result = await validateApi('firstLetter', letter);

    expect(result).toEqual(result);
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  });
});

describe('Testes para validateApiDrinks', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa a chamada de getDrinksByIngredient', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => drinkIngredients,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const ingredient = 'Applejack';
    const result = await validateApiDrinks('ingredient', ingredient);

    expect(result).toEqual(result);
    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  });

  test('Testa a chamada de getDrinksByName', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => drinkIngredients,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const name = 'Casa Blanca';
    const result = await validateApiDrinks('name', name);

    expect(result).toEqual(result);
    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  });

  test('Testa a chamada de getDrinksByFirstLetter', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => drinks,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const letter = 'c';
    const result = await validateApiDrinks('firstLetter', letter);

    expect(result).toEqual(result);
    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  });
});

describe('Testes para getMealsCategories', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa o tratamento de resposta não bem-sucedida da get Meals Categories', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponseNotFound);

    const resultGetCategories = await getMealsCategories();

    expect(resultGetCategories).toEqual(new Error('Not Found'));

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  });

  describe('Testes para getDrinksCategory', () => {
    afterEach(() => vi.clearAllMocks());

    test('Testa o tratamento de resposta não bem-sucedida da GetDrinksCategory', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue(mockResponseNotFound);

      const resultDrinkCategories = await getDrinksCategories();

      expect(resultDrinkCategories).toEqual(new Error('Not Found'));

      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    });
  });
});

describe('Testes para getMeals', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa o tratamento de resposta não bem-sucedida da getMeals', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponseNotFound);

    const resultGetMeals = await getMeals();

    expect(resultGetMeals).toEqual(new Error('Not Found'));

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});

describe('Testes para getDrinks', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa o tratamento de resposta não bem-sucedida da getDrinks', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponseNotFound);

    const resultGetDrinks = await getDrinks();

    expect(resultGetDrinks).toEqual(new Error('Not Found'));

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
});
