import { useState } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import { SongType } from '../types';

export interface MusicCardProps {
  music: SongType,
  isFavorite: boolean,
  loadFavorites?: () => void,
}

function MusicCard({ music, isFavorite, loadFavorites = () => null }: MusicCardProps) {
  const { trackName, previewUrl, trackId } = music;

  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavorite = async () => {
    setFavorite(!favorite);
    if (favorite) {
      removeSong(music);
    } else {
      addSong(music);
    }

    if (loadFavorites) loadFavorites();
  };

  return (
    <div>
      <span>{trackName}</span>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        Seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label data-testid={ `checkbox-music-${trackId}` }>
        Favorita
        {String(favorite)}
        {String(isFavorite)}
        <img
          src={ favorite
            ? '/src/images/checked_heart.png'
            : '/src/images/empty_heart.png' }
          alt="favorite"
        />
        <input
          type="checkbox"
          checked={ favorite }
          onChange={ () => handleFavorite() }
        />
      </label>

    </div>
  );
}

export default MusicCard;
