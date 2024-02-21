import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencies, saveExpense, editExpense } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    let data = await response.json();
    const { dispatch } = this.props;
    data = Object.keys(data).filter((currency) => currency !== 'USDT');
    dispatch(saveCurrencies(data));
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const { expenses, dispatch, editingId } = this.props;
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await response.json();
    formDataObject.exchangeRates = exchangeRates;

    if (editingId !== null) {
      formDataObject.id = editingId;
      dispatch(editExpense(formDataObject, editingId));
    } else {
      formDataObject.id = expenses.length > 0
        ? expenses[expenses.length - 1].id + 1 : 0;
      dispatch(saveExpense(formDataObject));
    }
    event.target.reset();
  }

  render() {
    const { currencies, editingId } = this.props;

    return (
      <form onSubmit={ this.handleSubmit.bind(this) }>
        <label htmlFor="value">Valor da despesa:</label>
        <input id="value" type="number" name="value" data-testid="value-input" />
        <label htmlFor="description">Descrição da despesa:</label>
        <input id="description" name="description" data-testid="description-input" />
        <label htmlFor="currency">Moeda:</label>
        <select id="currency" name="currency" data-testid="currency-input">
          {currencies.map((currency, index) => (
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
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  editingId: PropTypes.number,
};

WalletForm.defaultProps = {
  editingId: null,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editingId: state.wallet.editingId,
});

export default connect(mapStateToProps)(WalletForm);
