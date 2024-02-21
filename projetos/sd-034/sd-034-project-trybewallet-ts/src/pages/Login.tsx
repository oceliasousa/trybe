import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { saveUserEmail } from '../redux/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const minLengthPassword = 6;
    const emailValidation = /.+@[A-z]+[.]com/;

    if (password.length >= minLengthPassword && emailValidation.test(email)) {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  }, [email, password]);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(saveUserEmail(email));
    navigate('/carteira');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <p>Login</p>
        <div>
          <label>
            E-mail:
            <input
              data-testid="email-input"
              id="email"
              type="email"
              onChange={ handleChange }
              value={ email }
              name="email"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Senha:
            <input
              data-testid="password-input"
              id="password"
              type="password"
              onChange={ handleChange }
              value={ password }
              name="password"
              required
            />
          </label>
        </div>
        <div>
          <button
            data-testid="btn-play"
            id="btnPlay"
            type="submit"
            name="btnPlay"
            disabled={ loginDisabled }
          >
            Entrar
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
