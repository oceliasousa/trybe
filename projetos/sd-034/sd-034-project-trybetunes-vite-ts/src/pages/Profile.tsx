import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';
import Loading from './Loading';

function Profile() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    getUser().then((returnedUser) => {
      setUser(returnedUser);
    });
  }, []);

  if (!user) return <Loading />;

  return (
    <div data-testid="page-profile">
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.description}</p>
      <img src={ user.image } alt={ user.name } data-testid="profile-image" />
      <Link to="/profile/edit">Editar perfil</Link>
    </div>
  );
}

export default Profile;
