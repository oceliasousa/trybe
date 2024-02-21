import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs, productPrice } from './helpers/cartFunctions';

const section = document.querySelector('section.products');

const createLoading = () => {
  const loading = document.createElement('span');
  loading.classList.add('loading');
  loading.innerHTML = 'carregando...';
  section.appendChild(loading);
};

const removeLoading = () => {
  document.querySelector('span.loading').remove();
};

const createErrorMessage = () => {
  const error = document.createElement('span');
  error.classList.add('error');
  error.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  section.appendChild(error);
};

const createProducts = async () => {
  createLoading();
  try {
    const products = await fetchProductsList('computador');
    for (let i = 0; i < products.length; i += 1) {
      section.appendChild(createProductElement(products[i]));
    }
    removeLoading();
  } catch {
    createErrorMessage();
  }
};

const addToCartById = async (id) => {
  const product = await fetchProduct(id);
  const productElement = createCartProductElement(product);
  document.querySelector('ol.cart__products').appendChild(productElement);
  productPrice(product.price, 'add');
};

const addToCart = async (event) => {
  const parent = event.target.parentNode;
  const id = parent.querySelector('span.product__id').innerHTML;
  saveCartID(id);
  await addToCartById(id);
};

document.querySelector('.cep-button').addEventListener('click', searchCep);

await createProducts();

const buttons = document.querySelectorAll('button.product__add');
for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener('click', addToCart);
}

localStorage.setItem('totalPrice', 0.0);
const ids = getSavedCartIDs();
ids.forEach((id) => addToCartById(id));
