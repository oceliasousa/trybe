import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import { UserType } from '../types';
import Loading from './Loading';

function ProfileEdit() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    setLoading(true);
    getUser().then((returnedUser) => {
      setUser(returnedUser);
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    updateUser(user).then(() => navigate('/profile'));
  };

  const isValid = () => {
    return (user.name.length > 0
            && user.email.length > 0
            && user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
            && user.description.length > 0
            && user.image.length > 0);
  };

  const valid = isValid();

  if (loading) return <Loading />;

  return (
    <div data-testid="page-profile-edit">
      <form onSubmit={ handleSubmit }>
        <label>
          Nome
          <input
            type="text"
            name="name"
            data-testid="edit-input-name"
            value={ user.name }
            onChange={ handleChange }
          />
        </label>
        <label>
          Email
          <input
            type="text"
            name="email"
            data-testid="edit-input-email"
            value={ user.email }
            onChange={ handleChange }
          />
        </label>
        <label>
          Descrição
          <input
            type="text"
            name="description"
            data-testid="edit-input-description"
            value={ user.description }
            onChange={ handleChange }
          />
        </label>
        <label>
          Imagem
          <input
            type="text"
            name="image"
            data-testid="edit-input-image"
            value={ user.image }
            onChange={ handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="edit-button-save"
          disabled={ !valid }
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

export default ProfileEdit;
