import { screen, render, fireEvent } from '@testing-library/react';
import App from '../App';
import FavoritePokemon from '../pages/FavoritePokemon/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import { PokemonType } from '../types';

describe('Componente FavoritePokemon', () => {
  test('Deve exibir a mensagem quando não há pokémon favorito', () => {
    const favoritePokemon: PokemonType[] = [];
    const { getByText } = render(<FavoritePokemon pokemonList={ favoritePokemon } />);
    const noFavoritesMessage = getByText('No favorite Pokémon found');
    expect(noFavoritesMessage).toBeInTheDocument();
  });

  test('Deve exibir apenas pokémons favoritados', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText('More details'));
    fireEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    fireEvent.click(screen.getByText('Favorite Pokémon'));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
