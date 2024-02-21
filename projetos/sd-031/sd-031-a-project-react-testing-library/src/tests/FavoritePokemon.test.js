import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';

describe('Componente FavoritePokemon', () => {
  test('Deve exibir a mensagem quando não há pokémon favorito', () => {
    const favoritePokemon = [];
    const { getByText } = render(<FavoritePokemon pokemonList={ favoritePokemon } />);
    const noFavoritesMessage = getByText('No favorite Pokémon found');
    expect(noFavoritesMessage).toBeInTheDocument();
  });

  test('Deve exibir apenas pokémons favoritados', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByText('Favorite Pokémon'));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
