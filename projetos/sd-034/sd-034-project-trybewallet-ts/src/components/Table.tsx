import { useDispatch, useSelector } from 'react-redux';
import { removeExpense, startEdit } from '../redux/actions';
import { RootState } from '../types';

function Table() {
  const dispatch = useDispatch();

  const expenses = useSelector((state: RootState) => state.wallet.expenses);

  function handleDelete(id: number) {
    dispatch(removeExpense(id));
  }

  function handleEdit(id: number) {
    dispatch(startEdit(id));
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        { expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ Number(expense.value).toFixed(2) }</td>
            <td>{ expense.exchangeRates[expense.currency].name }</td>
            <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
            <td>
              {
                  (Number(expense.exchangeRates[expense.currency].ask)
                  * Number(expense.value))
                    .toFixed(2)
                }
            </td>
            <td>Real</td>
            <td>
              <button
                data-testid="delete-btn"
                onClick={ () => handleDelete(expense.id) }
              >
                Excluir
              </button>
              <button
                data-testid="edit-btn"
                onClick={ () => handleEdit(expense.id) }
              >
                Editar
              </button>
            </td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
