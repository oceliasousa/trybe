import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductType, CartItemsProps } from '../types';
import { removeProduct, changeQuantity } from '../services/localStorage';

function CartItems({ updateCartCount }: CartItemsProps) {
  const [productsInCart, setProductsInCart] = useState<ProductType[]>([]);

  const handleChangeQuantity = (product: ProductType, mult: number) => {
    setProductsInCart(changeQuantity(product, mult));
    updateCartCount();
  };

  const handleRemoveProduct = (product: ProductType) => {
    setProductsInCart(removeProduct(product, productsInCart));
    updateCartCount();
  };

  useEffect(() => {
    setProductsInCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  return (
    <section>
      {productsInCart.length ? (
        productsInCart.map((product) => (
          <div key={ product.id }>
            <img src={ product.thumbnail } alt={ product.title } />
            <p data-testid="shopping-cart-product-name">{product.title}</p>
            <p data-testid="shopping-cart-product-quantity">
              <strong>{product.quantity}</strong>
            </p>
            <p>{product.price}</p>
            <button
              data-testid="remove-product"
              onClick={ () => handleRemoveProduct(product) }
            >
              remover
            </button>
            <button
              data-testid="product-decrease-quantity"
              onClick={ () => handleChangeQuantity(product, -1) }
              disabled={ product.quantity === 1 }
            >
              -
            </button>
            <strong>{product.quantity}</strong>
            <button
              data-testid="product-increase-quantity"
              onClick={ () => handleChangeQuantity(product, 1) }
            >
              +
            </button>
          </div>
        ))
      ) : (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      )}
      <nav>
        <Link to="/checkout">
          <button
            disabled={ !productsInCart.length }
            data-testid="checkout-products"
          >
            Checkout
          </button>
        </Link>
      </nav>
    </section>
  );
}

export default CartItems;
