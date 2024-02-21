import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score, history } = this.props;
    const assertionsThreshold = 3;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
        <button
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <p data-testid="feedback-text">
          {assertions < assertionsThreshold ? 'Could be better...' : 'Well Done!'}
        </p>
        <p>
          Assertions:
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
        </p>
        <p>
          Score:
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
