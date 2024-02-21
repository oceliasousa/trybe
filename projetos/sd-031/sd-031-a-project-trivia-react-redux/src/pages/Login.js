import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUserEmail, saveUserName, thunkToken } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    userName: '',
    btn: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.btnAble());
  };

  btnAble = () => {
    const { email, userName } = this.state;
    const minLengthUserName = 1;

    const emailValidation = /.+@[A-z]+[.]com/;

    if (userName.length >= minLengthUserName && emailValidation.test(email)) {
      this.setState({
        btn: false,
      });
    } else {
      this.setState({
        btn: true,
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email, userName } = this.state;
    await dispatch(thunkToken());
    dispatch(saveUserName(userName));
    dispatch(saveUserEmail(email));
    history.push('/game');
  };

  hadleConfigBtn = () => {
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { email, userName, btn } = this.state;
    return (
      <form>
        <div>
          Login
          <br />
          <br />
          <label>
            Nome:
            <input
              data-testid="input-player-name"
              id="userName "
              type="text"
              onChange={ this.handleChange }
              value={ userName }
              name="userName"
              required
            />
          </label>
          <br />
          <br />
          <label>
            E-mail:
            <input
              data-testid="input-gravatar-email"
              id="email"
              type="email"
              onChange={ this.handleChange }
              value={ email }
              name="email"
              required
            />
          </label>
          <br />
          <br />
          <button
            data-testid="btn-play"
            id="btnPlay"
            type="submit"
            name="btnPlay"
            onClick={ this.handleSubmit }
            disabled={ btn }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.hadleConfigBtn }
          >
            Configurações
          </button>
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

const mapStateToProps = (state) => ({
  token: state.player.token,
});

export default connect(mapStateToProps)(Login);
