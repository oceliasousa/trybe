import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const moreDetails = 'More details';
const favoritePokemon = 'Pokémon favoritado?';

describe('PokemonDetails Component', () => {
  test('Should render the correct title', () => {
    const { getByRole } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: moreDetails }));
    const heading = getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Should render a title with the summary', () => {
    const { getByRole } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: moreDetails }));
    const heading = getByRole('heading', { name: 'Summary', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Should render a text with the summary', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: moreDetails }));
    const text = getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(text).toBeInTheDocument();
  });

  test('Should render a title with the game location', () => {
    const { getByRole } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: moreDetails }));
    const heading = getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Should render the image of the game location', () => {
    const { getAllByAltText } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: moreDetails }));
    const locations = getAllByAltText('Pikachu location');
    expect(locations).toHaveLength(2);
    expect(locations[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Should render a label for a favorite Pokémon', () => {
    const { getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: moreDetails }));
    expect(getByLabelText(favoritePokemon)).toBeInTheDocument();
  });

  test('Should be possible to favorite and unfavorite a Pokémon', () => {
    const { getByLabelText, getByAltText } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: moreDetails }));
    fireEvent.click(getByLabelText(favoritePokemon));

    const favoriteIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();

    fireEvent.click(getByLabelText(favoritePokemon));
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
