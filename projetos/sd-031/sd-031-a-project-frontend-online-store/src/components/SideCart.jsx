import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartItems from './CartItems';
import '../css/SideCart.css';

export default class SideCart extends Component {
  render() {
    const { showCart, updateCartCount } = this.props;

    return (
      <div className="sideCart" hidden={ !showCart }>
        <CartItems
          updateCartCount={ updateCartCount }
          noTestId
        />
      </div>
    );
  }
}

SideCart.propTypes = {
  updateCartCount: PropTypes.func.isRequired,
  showCart: PropTypes.bool.isRequired,
};
