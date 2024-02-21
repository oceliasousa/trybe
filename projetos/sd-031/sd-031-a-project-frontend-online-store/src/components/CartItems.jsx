import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { changeQuantity, removeProduct } from '../services/localStorage';

export default class CartItems extends Component {
  state = {
    productsInCart: [],
  };

  componentDidMount() {
    this.setState({
      productsInCart: JSON.parse(localStorage.getItem('cart')) || [],
    });
  }

  handleChangeQuantity = (product, mult) => {
    const { updateCartCount } = this.props;
    this.setState({
      productsInCart: changeQuantity(product, mult),
    });
    updateCartCount();
  };

  handleRemoveProduct = (product) => {
    const { updateCartCount } = this.props;
    const { productsInCart } = this.state;
    this.setState({ productsInCart: removeProduct(product, productsInCart) });
    updateCartCount();
  };

  render() {
    const { productsInCart } = this.state;
    const { noTestId } = this.props;
    const negativeMult = -1;

    return (
      <>
        <section>
          {productsInCart.length
            ? productsInCart.map((product) => (
              <div key={ product.id }>
                <button
                  data-testid={ !noTestId && 'remove-product' }
                  onClick={ () => this.handleRemoveProduct(product) }
                >
                  remover
                </button>
                <img src={ product.thumbnail } alt={ product.title } />
                <span
                  data-testid={ !noTestId && 'shopping-cart-product-name' }
                >
                  {product.title}
                </span>
                <span data-testid={ !noTestId && 'shopping-cart-product-quantity' }>
                  <button
                    data-testid={ !noTestId && 'product-decrease-quantity' }
                    onClick={ () => this.handleChangeQuantity(product, negativeMult) }
                    disabled={ product.quantity === 1 }
                  >
                    -
                  </button>
                  <strong>
                    {product.quantity}
                  </strong>
                  <button
                    data-testid={ !noTestId && 'product-increase-quantity' }
                    onClick={ () => this.handleChangeQuantity(product, 1) }
                  >
                    +
                  </button>
                </span>
                <span>{product.price}</span>
              </div>
            )) : (
              <p
                data-testid={ !noTestId && 'shopping-cart-empty-message' }
              >
                Seu carrinho está vazio
              </p>
            )}
        </section>
        <nav>
          <Link to="./Checkout">
            <button
              disabled={ !productsInCart.length }
              data-testid={ !noTestId ? '' : 'checkout-products' }
            >
              Checkout
            </button>
          </Link>
        </nav>

      </>
    );
  }
}

CartItems.propTypes = {
  updateCartCount: PropTypes.func.isRequired,
  noTestId: PropTypes.bool.isRequired,
};
