import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';

function Header() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((userResponse) => {
      setUser(userResponse);
      setLoading(false);
    });
  }, []);

  if (loading || !user) {
    return (<div>Carregando...</div>);
  }

  return (
    <header data-testid="header-component">
      <p data-testid="header-user-name">{ user.name }</p>
      <Link to="/search" data-testid="link-to-search">Buscar</Link>
      <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
      <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
    </header>
  );
}

export default Header;
