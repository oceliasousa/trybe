export async function getCategories() {
  // armazeneo endpoint com  as categorias em uma variável no escopo desta função
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';

  // faz um fetch para buscar as categorias no Mercado Livre
  const response = await fetch(URL);
  // transforma a resposta do fetch em JSON
  const data = await response.json();

  // retorna as categorias
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // armazeno a URL com os produtos em uma variável no escopo desta função
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;

  // faz um fetch para buscar os produtos no Mercado Livre
  const response = await fetch(URL);
  // transforma a resposta do fetch em JSON
  const data = await response.json();

  // retorna os produtos
  return data;
}

export async function getProductById(productId) {
  // armazeno a URL com os produtos em uma variável no escopo desta função
  const URL = `https://api.mercadolibre.com/items/${productId}`;

  // faz um fetch para buscar os produtos no Mercado Livre
  const response = await fetch(URL);
  // transforma a resposta do fetch em JSON
  const data = await response.json();

  // retorna os produtos
  return data;
}
