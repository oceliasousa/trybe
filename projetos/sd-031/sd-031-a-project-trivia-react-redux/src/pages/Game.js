import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from '../components/Question';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <Header />
        <h1>Game</h1>
        <Question history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
