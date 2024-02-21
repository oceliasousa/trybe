import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsCart3, BsSearch } from 'react-icons/bs';
import logoG from '../img/logoG.png';
import logoP from '../img/logoP.png';
import '../css/Header.css';
import SideCart from './SideCart';

export default class Header extends Component {
  constructor() {
    super();

    this.toggleCart = this.toggleCart.bind(this);

    this.state = {
      showCart: false,
    };
  }

  toggleCart(show) {
    this.setState({ showCart: show });
  }

  render() {
    const {
      query,
      handleChange,
      getProducts,
      cartCount,
      updateCartCount,
    } = this.props;

    const { showCart } = this.state;

    return (
      <header className="header">
        <div className="logo-container">
          <img className="logo-p" src={ logoP } alt="Shopping 07 logo" />
          <img className="logo-g" src={ logoG } alt="Shopping 07 logo" />
        </div>
        <form className="btn-container">
          <input
            data-testid="query-input"
            type="text"
            name="query"
            className="btn input"
            value={ query }
            onChange={ handleChange }
            id="search"
            placeholder="digite o que você busca"
          />
          <button
            className="btn search"
            data-testid="query-button"
            onClick={ getProducts }
          >
            <BsSearch size="20px" />
          </button>
        </form>
        <div
          onMouseEnter={ () => this.toggleCart(true) }
          onMouseLeave={ () => this.toggleCart(false) }
          className="cart-container"
        >
          <Link to="/cart" data-testid="shopping-cart-button">
            <BsCart3 size="45px" />
          </Link>
          <SideCart
            updateCartCount={ updateCartCount }
            showCart={ showCart }
            toggleCart={ this.toggleCart }
          />
          <span
            className="count-cart"
            data-testid="shopping-cart-size"
          >
            { cartCount }
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  query: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  cartCount: PropTypes.number.isRequired,
  updateCartCount: PropTypes.func.isRequired,
};
