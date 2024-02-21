import { ProductType } from '../types';

const getCart = () => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};

const setCart = (arrayCart: ProductType[]) => {
  localStorage.setItem('cart', JSON.stringify(arrayCart));
};

export const addToCart = (product: ProductType) => {
  const cart = getCart();
  const itemInCart = cart
    .find((cartProduct: ProductType) => cartProduct.id === product.id);
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

export const changeQuantity = (product: ProductType, mult: number) => {
  const cart = getCart();
  const productChangeQtd = cart
    .find((cartProduct: ProductType) => cartProduct.id === product.id);
  const newQuantity = productChangeQtd.quantity + (mult * 1);
  if (newQuantity <= productChangeQtd.available_quantity) {
    productChangeQtd.quantity = newQuantity;
  }
  setCart(cart);
  return cart;
};

export const removeProduct = (product: ProductType, productsInCart: ProductType[]) => {
  const newProductsInCart = productsInCart.filter(({ id }) => id !== product.id);
  setCart(newProductsInCart);
  return newProductsInCart;
};
