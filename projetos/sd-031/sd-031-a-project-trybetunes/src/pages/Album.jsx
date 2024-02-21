import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.loadFavorites = this.loadFavorites.bind(this);
    this.state = {
      musics: [],
      favorites: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const musics = await getMusics(id);
    await this.loadFavorites();
    this.setState({ musics });
  }

  async loadFavorites() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  render() {
    const { musics, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="album-name">{ musics[0]?.collectionName }</p>
        <p data-testid="artist-name">{ musics[0]?.artistName }</p>
        { musics?.slice(1)?.map((music, index) => (<MusicCard
          key={ index }
          music={ music }
          loadFavorites={ this.loadFavorites }
          isFavorite={
            !!favorites?.find((favorite) => favorite.trackId === music.trackId)
          }
        />)) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
