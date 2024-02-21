import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Pokedex Component', () => {
  test('Should render the correct title', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2, name: 'Encountered Pokémon' });
    expect(heading).toBeInTheDocument();
  });

  test('Should render the next Pokémon in the list when the button is clicked', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Próximo Pokémon' }));
    const nextPokemonText = screen.getByText('Charmander');
    expect(nextPokemonText).toBeInTheDocument();
  });

  test('Only one Pokémon should be displayed at a time', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
  });

  test('Should display all filters', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Electric' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fire' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bug' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Poison' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Psychic' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Normal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dragon' })).toBeInTheDocument();
    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(7);
  });

  test('Should display all Pokémon when the All filter is selected', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Poison' }));
    expect(screen.getByText('Ekans')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
