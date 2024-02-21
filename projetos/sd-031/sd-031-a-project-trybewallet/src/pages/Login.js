import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUserEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loginDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.btnAble());
  };

  btnAble = () => {
    const { email, password } = this.state;
    const minLengthPassword = 6;

    const emailValidation = /.+@[A-z]+[.]com/;

    if (password.length >= minLengthPassword && emailValidation.test(email)) {
      this.setState({
        loginDisabled: false,
      });
    } else {
      this.setState({
        loginDisabled: true,
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(saveUserEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, loginDisabled } = this.state;
    return (
      <form>
        <div>
          <p>Login</p>
          <div>
            <label>
              E-mail:
              <input
                data-testid="email-input"
                id="email"
                type="email"
                onChange={ this.handleChange }
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
                onChange={ this.handleChange }
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
              onClick={ this.handleSubmit }
              disabled={ loginDisabled }
            >
              Entrar
            </button>
          </div>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
