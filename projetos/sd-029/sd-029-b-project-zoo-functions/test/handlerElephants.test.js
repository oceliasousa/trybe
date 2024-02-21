const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('Verifica se a função retorna undefined quando nenhum parâmetro é passado', () => {
    expect(handlerElephants()).toBeUndefined();
  });
  it('Verifica se a função retorna `Parâmetro inválido, é necessário uma string` quando o parâmetro passado não é uma string', () => {
    expect(handlerElephants(1)).toBe('Parâmetro inválido, é necessário uma string');
  });
  it('Verifica se a função retorna a quantidade de elefantes quando o parâmetro passado é count', () => {
    expect(handlerElephants('count')).toBe(4);
  });
  it('Verifica se a função retorna um array com a relação dos nomes de todos os elefantes quando o parâmetro passado é names', () => {
    expect(handlerElephants('names')).toStrictEqual(['Ilana', 'Orval', 'Bea', 'Jefferson']);
  });
  it('Verifica se a funçãoretorna a média de idade dos eclelefantes quando o parâmetro passado é averageAge', () => {
    expect(handlerElephants('averageAge')).toBe(10.5);
  });
  it('Verifica se a função retorna a localização dos elefantes quando o parâmetro passado é location', () => {
    expect(handlerElephants('location')).toBe('NW');
  });
  it('Verifica se a função retorna a popularidade dos elefantes quando o parâmetro passado é popularity', () => {
    expect(handlerElephants('popularity')).toBe(5);
  });
  it('Verifica se a função retorna a popularidade dos elefantes quando o parâmetro passado é popularity', () => {
    expect(handlerElephants('popularity')).toBe(5);
  });
  it('Verifica se a função retorna um array com a relação de dias em que é possível visitar os elefantes quando o parâmetro passado é availability', () => {
    expect(handlerElephants('availability')).toStrictEqual(['Friday', 'Saturday', 'Sunday', 'Tuesday']);
  });
  it('Verifica se a função retorna null quando o parâmetro passado é uma string inválida', () => {
    expect(handlerElephants('test')).toBe(null);
  });
});
