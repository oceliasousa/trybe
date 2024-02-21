import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Top navigation links test in the application', () => {
  test('Should contain the links Home, About, and Favorite Pokémon', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const favoritePokemonLink = screen.getByText('Favorite Pokémon');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonLink).toBeInTheDocument();
  });
});
