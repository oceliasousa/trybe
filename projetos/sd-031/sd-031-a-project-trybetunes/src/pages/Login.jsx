import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const MIN_NAME = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
  }

  render() {
    const { name, loading } = this.state;
    const { history } = this.props;

    if (!loading) {
      return (
        <div data-testid="page-login">
          <form
            onSubmit={ async (event) => {
              event.preventDefault();
              this.setState({ loading: true });
              await createUser({ name });
              history.push('/search');
            } }
          >
            <label htmlFor="login-name-input">Name:</label>
            <input
              data-testid="login-name-input"
              id="login-name-input"
              value={ name }
              onChange={ (event) => this.setState({ name: event.target.value }) }
            />
            <button
              data-testid="login-submit-button"
              disabled={ name.length < MIN_NAME }
              type="submit"
            >
              Entrar
            </button>
          </form>
        </div>
      );
    }
    return (<Loading />);
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
