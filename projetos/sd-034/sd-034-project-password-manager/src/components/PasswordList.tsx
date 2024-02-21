import { useState } from 'react';
import { Password } from './Form';

type PasswordListProps = {
  list: Password[];
  removeFromPasswordList: (indexToRemove: number) => void;
};

function PasswordList({ list, removeFromPasswordList }: PasswordListProps) {
  const [hidePasswords, setHidePasswords] = useState<boolean>(false);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={ hidePasswords }
          onChange={ () => setHidePasswords(!hidePasswords) }
        />
        Esconder senhas
      </label>
      {list.length === 0 ? 'Nenhuma senha cadastrada' : list.map((item, index) => (
        <div key={ index }>
          <a href={ item.url }>{item.name}</a>
          <span>{item.login}</span>
          <span>{hidePasswords ? '******' : item.password}</span>
          <button
            data-testid="remove-btn"
            onClick={ () => removeFromPasswordList(index) }
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
}

export default PasswordList;
