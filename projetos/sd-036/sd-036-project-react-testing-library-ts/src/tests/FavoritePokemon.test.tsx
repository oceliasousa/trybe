import { screen, render, fireEvent } from '@testing-library/react';
import App from '../App';
import FavoritePokemon from '../pages/FavoritePokemon/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import { PokemonType } from '../types';

describe('FavoritePokemon Component', () => {
  test('Should display a message when there are no favorite Pokémon', () => {
    const favoritePokemon: PokemonType[] = [];
    const { getByText } = render(<FavoritePokemon pokemonList={ favoritePokemon } />);
    const noFavoritesMessage = getByText('No favorite Pokémon found');
    expect(noFavoritesMessage).toBeInTheDocument();
  });

  test('Should display only favorited Pokémon', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText('More details'));
    fireEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    fireEvent.click(screen.getByText('Favorite Pokémon'));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
