import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Header from '../Components/Header';
import Footer from './Footer';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user') as string);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate('/');
    localStorage.clear();
  };

  return (
    <>
      <Header pageTittle="Profile" />

      <p data-testid="profile-email">{localStorage.getItem('user') && user.email}</p>

      <Button
        data-testid="profile-done-btn"
        onClick={ () => navigate('/done-recipes') }
      >
        Done Recipes
      </Button>

      <Button
        data-testid="profile-favorite-btn"
        onClick={ () => navigate('/favorite-recipes') }
      >
        Favorite Recipes
      </Button>

      <Button
        data-testid="profile-logout-btn"
        onClick={ handleLogoutClick }
      >
        Logout
      </Button>
      <Footer />
    </>
  );
}

export default Profile;
