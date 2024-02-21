import { useState, useEffect } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { SongType } from '../types';
import Loading from './Loading';
import MusicCard from './MusicCard';

function Favorites() {
  const [favorites, setFavorites] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    const favoriteSongs = await getFavoriteSongs();
    setFavorites(favoriteSongs);
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <div data-testid="page-favorites">
      { favorites.map((song, index) => (
        <MusicCard
          key={ index }
          music={ song }
          loadFavorites={ loadFavorites }
          isFavorite
        />
      )) }
    </div>
  );
}

export default Favorites;
