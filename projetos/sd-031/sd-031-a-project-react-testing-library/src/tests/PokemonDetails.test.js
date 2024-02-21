import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const moreDetails = 'More details';
const favoritePokemon = 'Pokémon favoritado?';

describe('Componente PokemonDetails', () => {
  test('Deve renderizar o título correto', () => {
    const { getByRole } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    const heading = getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Deve renderizar um título com o summary', () => {
    const { getByRole } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    const heading = getByRole('heading', { name: 'Summary', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Deve renderizar um texto com o summary', () => {
    const { getByText } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    const text = getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(text).toBeInTheDocument();
  });

  test('Deve renderizar um título com a localização no jogo', () => {
    const { getByRole } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    const heading = getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Deve renderizar a imagem da localização no jogo', () => {
    const { getAllByAltText } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    const locations = getAllByAltText('Pikachu location');
    expect(locations).toHaveLength(2);
    expect(locations[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Deve renderizar uma lable de um pokémon favorito', () => {
    const { getByLabelText } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    expect(getByLabelText(favoritePokemon)).toBeInTheDocument();
  });

  test('Deve ser possível favoritar e desfavoritar um pokémon', () => {
    const { getByLabelText, getByAltText } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    userEvent.click(getByLabelText(favoritePokemon));

    const favoriteIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();

    userEvent.click(getByLabelText(favoritePokemon));
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
