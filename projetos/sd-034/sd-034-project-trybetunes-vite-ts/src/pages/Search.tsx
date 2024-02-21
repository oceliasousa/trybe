import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';

const MIN_SEARCH = 2;

function Search() {
  const [search, setSearch] = useState('');
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [artist, setArtist] = useState('');

  const onSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await searchAlbumsAPI(search);
    setAlbums(result);
    setArtist(search);
    setSearch('');
  };

  const albumList = () => {
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
              to={ `/album/${album.collectionId}` }
            >
              <span>{album.collectionName}</span>
              <span>{album.artistName}</span>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div data-testid="page-search">
      <form onSubmit={ onSearch }>
        <input
          data-testid="search-artist-input"
          id="search-artist-input"
          placeholder="Nome do Artista"
          value={ search }
          onChange={ (event) => setSearch(event.target.value) }
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
            ? albumList()
            : <span>Nenhum álbum foi encontrado</span>
        }
      </div>
    </div>
  );
}

export default Search;
