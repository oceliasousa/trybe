import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  async addSong() {
    const { music, loadFavorites, isFavorite } = this.props;
    this.setState({ loading: true });
    if (isFavorite) {
      await removeSong(music);
    } else {
      await addSong(music);
    }
    await loadFavorites();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    }

    const { music, isFavorite } = this.props;
    const { trackName, previewUrl, trackId } = music;
    return (
      <div>
        <span>
          { trackName }
        </span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code> audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>Favorita</label>
        <input
          type="checkbox"
          id={ `checkbox-music-${trackId}` }
          data-testid={ `checkbox-music-${trackId}` }
          checked={ isFavorite }
          onChange={ () => this.addSong() }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  loadFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;
