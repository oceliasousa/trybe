import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartItems from '../components/CartItems';

export default class Cart extends Component {
  render() {
    const { updateCartCount } = this.props;
    return (
      <main>
        <nav>
          <Link to="/">
            <button>Voltar</button>
          </Link>
        </nav>
        <CartItems updateCartCount={ updateCartCount } noTestId={ false } />
      </main>
    );
  }
}

Cart.propTypes = {
  updateCartCount: PropTypes.func.isRequired,
};
