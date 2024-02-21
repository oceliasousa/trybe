import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

function Login() {
  const [name, setName] = useState<string >('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await createUser({ name });
    navigate('/search');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  if (loading) return <Loading />;

  return (
    <div data-testid="page-login">
      <form onSubmit={ handleSubmit }>
        <label htmlFor="login-name-input">Name:</label>
        <input
          data-testid="login-name-input"
          id="login-name-input"
          value={ name }
          onChange={ handleChange }
        />
        <button
          data-testid="login-submit-button"
          disabled={ name.length < 3 }
          type="submit"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
