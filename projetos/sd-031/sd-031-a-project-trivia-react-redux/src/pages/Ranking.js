import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { getRanking } from '../helpers/localStorage';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = getRanking().sort((a, b) => b.score - a.score);

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          {ranking.map((player, index) => (
            <div key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail)}` }
                alt="User avatar"
                style={ { marginRight: '1rem' } }
              />
              <span
                data-testid={ `player-name-${index}` }
                style={ { marginRight: '1rem' } }
              >
                {player.name}
              </span>
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </div>
          ))}
        </div>
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Go home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
