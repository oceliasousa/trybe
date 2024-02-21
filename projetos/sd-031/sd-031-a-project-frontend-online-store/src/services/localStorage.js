const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
const setCart = (arrayCart) => {
  localStorage.setItem('cart', JSON.stringify(arrayCart));
};

export const addToCart = (product) => {
  const cart = getCart();
  const itemInCart = cart.find(({ id }) => id === product.id);
  if (itemInCart) {
    itemInCart.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }
  setCart(cart);
};

export const changeQuantity = (product, mult) => {
  const cart = getCart();
  const productChangeQtd = cart.find(({ id }) => id === product.id);
  const newQuantity = productChangeQtd.quantity + (mult * 1);
  if (newQuantity <= productChangeQtd.available_quantity) {
    productChangeQtd.quantity = newQuantity;
  }
  setCart(cart);
  return cart;
};

export const removeProduct = (product, productsInCart) => {
  const newProductsInCart = productsInCart.filter(({ id }) => id !== product.id);
  setCart(newProductsInCart);
  return newProductsInCart;
};
