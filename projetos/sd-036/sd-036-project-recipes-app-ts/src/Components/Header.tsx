import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';
import { PageTittleProp } from '../types';
import SearchBar from './SearchBar';
import Button from './Button';
import profileIcon from '../images/profileIcon.svg';
import iconApp from '../images/logoApp.jpeg';

function Header({ pageTittle }: PageTittleProp) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsSearchVisible((prevIsSearchVisible) => !prevIsSearchVisible);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header>
      <div className="header-content">
        <div className="logo-container">
          <img src={ iconApp } alt="icone do aplicativo de receitas" />
          <h2>RECIPES app</h2>
        </div>
        <div className="button-container">
          {(pageTittle === 'Meals' || pageTittle === 'Drinks')
&& (
  <Button
    onClick={ handleSearchToggle }
  >
    <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
  </Button>
)}
          <Button onClick={ handleProfileClick }>
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </Button>
        </div>
      </div>
      <div>
        <h1 data-testid="page-title">{pageTittle}</h1>
      </div>
      { isSearchVisible
      && (
        <SearchBar />
      )}
    </header>
  );
}
export default Header;
