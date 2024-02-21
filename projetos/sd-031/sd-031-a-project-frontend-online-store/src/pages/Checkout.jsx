import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campos: {
        fullname: '',
        email: '',
        cpf: '',
        phone: '',
        cep: '',
        address: '',
        payment: '',
      },
      productsInCart: [],
      mostrarErro: false,
    };
  }

  componentDidMount() {
    this.setState({
      productsInCart: JSON.parse(localStorage.getItem('cart')) || [],
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      campos: {
        ...prevState.campos,
        [name]: value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { campos } = this.state;
    const { history, updateCartCount } = this.props;
    const { fullname, email, cpf, phone, cep, address, payment } = campos;
    const camposInvalidos = !fullname
    || !email || !cpf || !phone || !cep || !address || !payment;
    if (camposInvalidos) {
      this.setState({ mostrarErro: camposInvalidos });
      return;
    }
    localStorage.setItem('cart', JSON.stringify([]));
    updateCartCount();
    history.push('/');
  };

  render() {
    const { productsInCart, campos, mostrarErro } = this.state;
    return (
      <>
        <section>
          <h1>Revise seus produtos</h1>
          { productsInCart.map(({ title, thumbnail, price, id }) => (
            <div key={ id }>
              <img src={ thumbnail } alt={ title } />
              <span>{ title }</span>
              <span>{ price }</span>
            </div>
          )) }
        </section>
        <form onSubmit={ this.handleSubmit }>
          <div>
            <label htmlFor="fullname">Nome Completo:</label>
            <input
              name="fullname"
              type="text"
              id="fullname"
              data-testid="checkout-fullname"
              value={ campos.fullname }
              onChange={ this.handleChange }
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              type="email"
              id="email"
              data-testid="checkout-email"
              value={ campos.email }
              onChange={ this.handleChange }
              required
            />
          </div>

          <div>
            <label htmlFor="cpf">CPF:</label>
            <input
              name="cpf"
              type="text"
              id="cpf"
              data-testid="checkout-cpf"
              value={ campos.cpf }
              onChange={ this.handleChange }
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Telefone:</label>
            <input
              name="phone"
              type="text"
              id="phone"
              data-testid="checkout-phone"
              value={ campos.phone }
              onChange={ this.handleChange }
              required
            />
          </div>

          <div>
            <label htmlFor="cep">CEP:</label>
            <input
              name="cep"
              type="text"
              id="cep"
              data-testid="checkout-cep"
              value={ campos.cep }
              onChange={ this.handleChange }
              required
            />
          </div>

          <div>
            <label htmlFor="address">Endereço:</label>
            <input
              name="address"
              type="text"
              id="address"
              data-testid="checkout-address"
              value={ campos.address }
              onChange={ this.handleChange }
              required
            />
          </div>

          <div>
            <h3>Método de pagamento:</h3>
            <div>
              <input
                type="radio"
                id="ticket"
                name="payment"
                data-testid="ticket-payment"
                value="Boleto"
                checked={ campos.payment === 'Boleto' }
                onChange={ this.handleChange }
                required
              />
              <label htmlFor="ticket">Boleto</label>
            </div>
            <div>
              <input
                type="radio"
                id="visa"
                name="payment"
                data-testid="visa-payment"
                value="Visa"
                checked={ campos.payment === 'Visa' }
                onChange={ this.handleChange }
                required
              />
              <label htmlFor="visa">Visa</label>
            </div>
            <div>
              <input
                type="radio"
                id="master"
                name="payment"
                data-testid="master-payment"
                value="MasterCard"
                checked={ campos.payment === 'MasterCard' }
                onChange={ this.handleChange }
                required
              />
              <label htmlFor="master">MasterCard</label>
            </div>
            <div>
              <input
                type="radio"
                id="elo"
                name="payment"
                data-testid="elo-payment"
                value="Elo"
                checked={ campos.payment === 'Elo' }
                onChange={ this.handleChange }
                required
              />
              <label htmlFor="elo">Elo</label>
            </div>
          </div>
          { mostrarErro && <div data-testid="error-msg">Campos inválidos</div> }
          <button
            onClick={ this.handleSubmit }
            type="submit"
            data-testid="checkout-btn"
          >
            Enviar
          </button>
        </form>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  updateCartCount: PropTypes.func.isRequired,
};
