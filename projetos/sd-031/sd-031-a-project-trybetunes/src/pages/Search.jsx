import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_SEARCH = 2;

class Search extends React.Component {
  constructor() {
    super();

    this.onSearch = this.onSearch.bind(this);

    this.state = {
      search: '',
      albums: [],
      artist: '',
    };
  }

  async onSearch(event) {
    event.preventDefault();
    const { search } = this.state;
    const result = await searchAlbumsAPI(search);
    this.setState({ albums: result, artist: search, search: '' });
  }

  albumList() {
    const { albums, artist } = this.state;

    return (
      <div>
        <p>
          Resultado de álbuns de:
          {' '}
          {artist}
        </p>
        {albums.map((album, index) => (
          <div key={ index }>
            <Link
              key={ index }
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `album/${album.collectionId}` }
            >
              <span>{album.collectionName}</span>
              <span>{album.artistName}</span>
            </Link>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { search, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.onSearch }>
          <input
            data-testid="search-artist-input"
            id="search-artist-input"
            placeholder="Nome do Artista"
            value={ search }
            onChange={ (event) => this.setState({ search: event.target.value }) }
          />
          <button
            disabled={ search.length < MIN_SEARCH }
            data-testid="search-artist-button"
            type="submit"
          >
            Procurar
          </button>
        </form>
        <div>
          {
            albums.length > 0
              ? this.albumList()
              : <span>Nenhum álbum foi encontrado</span>
          }
        </div>
      </div>
    );
  }
}

export default Search;
