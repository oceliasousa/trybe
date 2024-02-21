import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${md5(user.gravatarEmail)}` } alt="User avatar" />
        <span data-testid="header-player-name">{ user.name }</span>
        <span data-testid="header-score">{ user.score }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.player,
});

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
