import { AlbumType, SongType } from '../types';

const getMusics = async (id: string): Promise<[AlbumType, ...SongType[]]> => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const requestJson = await request.json();
  const data = requestJson.results;
  data.unshift({
    artistName: 'Artist Name',
    collectionName: 'Collection Name',
  });
  return data;
};

export default getMusics;
