import { vi } from 'vitest';
import { getDrinksbyCategories, getDrinksCategories, getDrinks } from '../services/api';

function generateMockDrinks(count: number) {
  return Array.from({ length: count }, (_, index) => ({ drink: `Drink ${index + 1}` }));
}

describe('Testa a página de drinks', () => {
  afterEach(() => vi.clearAllMocks());

  test('Testa se a função getDrinksCategories faz o fetch da api e são renderizadas 5 categorias de drinks', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => ({ drinks: generateMockDrinks(5) }),
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    const result = await getDrinksCategories();

    expect(mockFetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    expect(result).toEqual(generateMockDrinks(5));
  });
});

describe('Testa a página de drinks', () => {
  afterEach(() => vi.clearAllMocks());
  test('Testa se a função getDrinks faz o fetch da api e são renderizadas 12 receitas', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => ({ drinks: generateMockDrinks(12) }),
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    const result = await getDrinks();

    expect(mockFetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(result).toEqual(generateMockDrinks(12));
  });

  test('Testafunção getDrinksbyCategories faz a requisição à API corretamente e renderiza os drinks apenas dessa categoria', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ drinks: [{ idDrink: '1', strDrink: 'Mocktail 1' }] }),
    } as Response);

    const category = 'Mocktail Category';
    const result = await getDrinksbyCategories(category);

    expect(mockFetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

    expect(result).toEqual([{ idDrink: '1', strDrink: 'Mocktail 1' }]);
  });

  test('Teste de tratamento de erro da API', async () => {
    const mockFetch = vi
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      } as Response);

    const category = 'Invalid Category';
    const result = await getDrinksbyCategories(category);

    expect(mockFetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

    expect(result).toBeInstanceOf(Error);
  });
});
