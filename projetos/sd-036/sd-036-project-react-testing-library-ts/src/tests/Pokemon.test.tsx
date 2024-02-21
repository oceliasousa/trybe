import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokemon Component', () => {
  test('Should render the correct alt and src', () => {
    const { getByAltText } = renderWithRouter(<App />);
    expect(getByAltText('Pikachu sprite')).toHaveAttribute(
      'src',
      'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  test('Should correctly render the Pokémon attributes', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
      'Average weight: 6.0 kg',
    );
  });

  test('Should correctly render the favorite icon', () => {
    const { getByAltText } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('More details'));
    fireEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    fireEvent.click(screen.getByText('Favorite Pokémon'));
    expect(getByAltText('Pikachu is marked as favorite')).toHaveAttribute(
      'src',
      '/star-icon.png',
    );
    expect(getByAltText('Pikachu is marked as favorite')).toHaveAttribute(
      'class',
      'favorite-icon',
    );
  });

  test('Should display on screen a text with the type of the Pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-type')).toHaveTextContent('Electric');
  });

  test('Should display on screen a link to the Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('More details')).toHaveAttribute('href', '/pokemon/25');
  });
});
