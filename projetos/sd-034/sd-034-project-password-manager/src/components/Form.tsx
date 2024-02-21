import { useEffect, useState } from 'react';

export type Password = {
  name: string,
  login: string,
  password: string,
  url: string,
};

type FormProps = {
  toggleForm: () => void;
  addToPasswordList: (password: Password) => void;
};

function Form({ toggleForm, addToPasswordList }: FormProps) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    login: '',
    password: '',
    url: '',
  });
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const passwordMinLengthId = 'password-min-length';
  const passwordMaxLengthId = 'password-max-length';
  const passwordLettersAndNumbersId = 'password-letters-and-numbers';
  const passwordSpecialCharacterId = 'password-special-character';

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    addToPasswordList(formData);
  }

  useEffect(() => {
    let isValid = true;
    const invalidClass = 'invalid-password-check';
    const validClass = 'valid-password-check';

    if (formData.name.length === 0) isValid = false;
    if (formData.login.length === 0) isValid = false;
    if (formData.password.length < 8) {
      document.getElementById(passwordMinLengthId)?.classList.add(invalidClass);
      document.getElementById(passwordMinLengthId)?.classList.remove(validClass);
      isValid = false;
    } else {
      document.getElementById(passwordMinLengthId)?.classList.remove(invalidClass);
      document.getElementById(passwordMinLengthId)?.classList.add(validClass);
    }
    if (formData.password.length > 16) {
      document.getElementById(passwordMaxLengthId)?.classList.add(invalidClass);
      document.getElementById(passwordMaxLengthId)?.classList.remove(validClass);
      isValid = false;
    } else {
      document.getElementById(passwordMaxLengthId)?.classList.remove(invalidClass);
      document.getElementById(passwordMaxLengthId)?.classList.add(validClass);
    }
    if (!formData.password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)) {
      document.getElementById(passwordLettersAndNumbersId)?.classList.add(invalidClass);
      document.getElementById(passwordLettersAndNumbersId)?.classList.remove(validClass);
      isValid = false;
    } else {
      document.getElementById(passwordLettersAndNumbersId)?.classList
        .remove(invalidClass);
      document.getElementById(passwordLettersAndNumbersId)?.classList.add(validClass);
    }
    if (!formData.password.match(/[!@#$%^&*()\-+=<>?/[\]{}\\|'";:,.~` ]/)) {
      document.getElementById(passwordSpecialCharacterId)?.classList.add(invalidClass);
      document.getElementById(passwordSpecialCharacterId)?.classList.remove(validClass);
      isValid = false;
    } else {
      document.getElementById(passwordSpecialCharacterId)?.classList.remove(invalidClass);
      document.getElementById(passwordSpecialCharacterId)?.classList.add(validClass);
    }

    return setIsFormValid(isValid);
  }, [formData]);

  return (
    <form onSubmit={ handleSubmit }>
      <label>
        Nome do serviço
        <input
          type="text"
          name="name"
          value={ formData.name }
          onChange={ handleChange }
        />
      </label>
      <label>
        Login
        <input
          type="text"
          name="login"
          value={ formData.login }
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="show-hide-form-password"
        onClick={ () => setHidePassword(!hidePassword) }
      >
        {hidePassword ? 'Mostrar' : 'Esconder'}
      </button>
      <label>
        Senha
        <input
          type={ hidePassword ? 'password' : 'text' }
          name="password"
          value={ formData.password }
          onChange={ handleChange }
        />
      </label>
      <div>
        <span
          id={ passwordMinLengthId }
          className="invalid-password-check"
        >
          Possuir 8 ou mais caracteres
        </span>
        <span
          id={ passwordMaxLengthId }
          className="valid-password-check"
        >
          Possuir até 16 caracteres
        </span>
        <span
          id={ passwordLettersAndNumbersId }
          className="invalid-password-check"
        >
          Possuir letras e números
        </span>
        <span
          id={ passwordSpecialCharacterId }
          className="invalid-password-check"
        >
          Possuir algum caractere especial
        </span>
      </div>
      <label>
        URL
        <input
          type="text"
          name="url"
          value={ formData.url }
          onChange={ handleChange }
        />
      </label>
      <button disabled={ !isFormValid } type="submit">Cadastrar</button>
      <button onClick={ toggleForm } type="button">Cancelar</button>
    </form>
  );
}

export default Form;
