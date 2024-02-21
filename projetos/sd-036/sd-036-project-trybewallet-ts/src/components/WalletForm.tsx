import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveCurrencies, saveExpense, editExpense } from '../redux/actions';
import { ExpenseType, RootState } from '../types';

function WalletForm() {
  const dispatch = useDispatch();

  const currencies = useSelector((state: RootState) => state.wallet.currencies);
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  const editingId = useSelector((state: RootState) => state.wallet.editingId);

  useEffect(() => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => {
        response.json().then((parsedResponse) => {
          const data = Object.keys(parsedResponse)
            .filter((currency) => currency !== 'USDT');
          dispatch(saveCurrencies(data));
        });
      });
  }, [dispatch]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const formDataObject:{ [k: string]: FormDataEntryValue; } = Object
      .fromEntries(formData.entries());

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await response.json();

    const data: ExpenseType = {
      id: 0,
      exchangeRates,
      value: formDataObject.value.toString(),
      currency: formDataObject.currency.toString(),
      description: formDataObject.description.toString(),
      tag: formDataObject.tag.toString(),
      method: formDataObject.method.toString(),
    };

    if (editingId !== null) {
      data.id = editingId;
      dispatch(editExpense(data, editingId));
    } else {
      data.id = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 0;
      dispatch(saveExpense(data));
    }

    form.reset();
  }

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="value">Valor da despesa:</label>
      <input id="value" type="number" name="value" data-testid="value-input" />
      <label htmlFor="description">Descrição da despesa:</label>
      <input id="description" name="description" data-testid="description-input" />
      <label htmlFor="currency">Moeda:</label>
      <select id="currency" name="currency" data-testid="currency-input">
        {currencies.map((currency: string, index: number) => (
          <option key={ index } value={ currency }>
            {currency}
          </option>
        ))}
      </select>
      <label htmlFor="method">Método de pagamento:</label>
      <select id="method" name="method" data-testid="method-input">
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
      <label htmlFor="tag">Categoria:</label>
      <select id="tag" name="tag" data-testid="tag-input">
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
      <button type="submit" data-testid="add-btn">
        { editingId !== null ? 'Editar despesa' : 'Adicionar despesa' }
      </button>
    </form>
  );
}

export default WalletForm;
