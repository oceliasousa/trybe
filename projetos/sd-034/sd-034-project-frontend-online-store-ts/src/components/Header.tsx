import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/white-logo.png';
import cart from '../img/white-cart.png';
import SideCart from './SideCart';
import { HeaderProps } from '../types';
import '../css/Header.css';

function Header({
  cartCount,
  updateCartCount,
}: HeaderProps): React.ReactElement {
  const [showCart, setShowCart] = useState<boolean>(false);

  const navigate = useNavigate();

  const toggleCart = (show: boolean) => {
    setShowCart(show);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchInput = document.getElementById('query');
    if (searchInput) {
      const query = (searchInput as HTMLInputElement).value;
      navigate(`/?query=${query}`);
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img className="logo" src={ logo } alt="Online store logo" />
      </div>
      <div className="header-content">
        <form className="btn-container" onSubmit={ handleSearch }>
          <input
            data-testid="query-input"
            type="text"
            name="query"
            className="search-bar"
            id="query"
            placeholder="digite o que você busca"
          />
          <button
            className="search-button"
            data-testid="query-button"
          >
            Buscar
          </button>
        </form>
        <div
          onMouseEnter={ () => toggleCart(true) }
          onMouseLeave={ () => toggleCart(false) }
          className="cart-container"
        >
          <Link to="/cart" data-testid="shopping-cart-button">
            <img className="cart-icon" src={ cart } alt="Cart" />
          </Link>
          <SideCart
            updateCartCount={ updateCartCount }
            showCart={ showCart }
            toggleCart={ toggleCart }
          />
          <span className="cart-count" data-testid="shopping-cart-size">
            {cartCount}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
