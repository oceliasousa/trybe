import './App.css';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Form, { Password } from './components/Form';
import PasswordList from './components/PasswordList';

function App() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [passwordList, setPasswordList] = useState<Password[]>([]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const addToPasswordList = (password: Password) => {
    setPasswordList((prevPasswordList: Password[]) => [...prevPasswordList, password]);
    setShowForm(false);
    Swal.fire({
      text: 'Serviço cadastrado com sucesso',
      timer: 1500,
    });
  };

  const removeFromPasswordList = (indexToRemove: number) => {
    setPasswordList((prevPasswordList) => prevPasswordList
      .filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <h1>Gerenciador de senhas</h1>
      {showForm
        ? <Form
            toggleForm={ toggleForm }
            addToPasswordList={ addToPasswordList }
        />
        : <button onClick={ toggleForm }>Cadastrar nova senha</button>}
      <PasswordList
        list={ passwordList }
        removeFromPasswordList={ removeFromPasswordList }
      />
    </div>
  );
}

export default App;
