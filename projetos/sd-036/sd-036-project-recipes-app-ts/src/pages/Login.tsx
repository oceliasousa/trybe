import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const emailIsValid = email.includes('@') && email.includes('.');

    const passwordIsValid = password.length > 6;

    setIsFormValid(emailIsValid && passwordIsValid);
  }, [email, password]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      localStorage.setItem('user', JSON.stringify({ email }));
      alert('Login efetuado');
      navigate('/meals');
    }
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          data-testid="email-input"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          data-testid="password-input"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />

        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !isFormValid }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
