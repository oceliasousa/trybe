/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = [...getSavedCartIDs()];
  const indexProduct = cartProducts.indexOf(id);
  cartProducts.splice(indexProduct, 1);
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
};

export const productPrice = (price, operation) => {
  let totalPrice = parseFloat(localStorage.getItem('totalPrice'));
  if (Number.isNaN(totalPrice)) {
    totalPrice = 0.0;
  }
  if (operation === 'add') {
    totalPrice += price;
  } else {
    totalPrice -= price;
  }
  totalPrice = totalPrice.toFixed(2);
  localStorage.setItem('totalPrice', totalPrice);
  document.getElementsByClassName('total-price')[0].innerHTML = totalPrice;
};