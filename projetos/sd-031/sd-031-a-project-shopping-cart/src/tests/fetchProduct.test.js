import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');

    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');

    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('testa se o retorno da função é uma estrutura de dados igual ao objeto product', async () => {
    const response = await fetchProduct('MLB1405519561');

    expect(response).toStrictEqual(product);
  });

  it('testa se ao chamar a função sem argumento retorna um erro', async () => {
    await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });
});
