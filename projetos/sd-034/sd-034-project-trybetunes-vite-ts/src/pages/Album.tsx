import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { AlbumType, SongType } from '../types';
import Loading from './Loading';

function Album() {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [songs, setSongs] = useState<SongType[]>([]);
  const [favorites, setFavorites] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getMusics(id).then((musicResponse) => {
        setAlbum(musicResponse[0] as AlbumType);
        setSongs(musicResponse.slice(1) as SongType[]);
        getFavoriteSongs().then((favoritesResponse) => {
          setFavorites(favoritesResponse);
          setLoading(false);
        });
      });
    }
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div data-testid="page-album">
      <p data-testid="album-name">{ album?.collectionName }</p>
      <p data-testid="artist-name">{ album?.artistName }</p>
      { songs.map((song, index) => (
        <MusicCard
          key={ index }
          music={ song }
          isFavorite={ favorites.some((favorite) => favorite.trackId === song.trackId) }
        />
      )) }
    </div>
  );
}

export default Album;
