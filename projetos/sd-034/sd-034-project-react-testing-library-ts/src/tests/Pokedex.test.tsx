import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Componente Pokedex', () => {
  test('Deve renderizar o título correto', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2, name: 'Encountered Pokémon' });
    expect(heading).toBeInTheDocument();
  });

  test('Deve renderizar o próximo pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Próximo Pokémon' }));
    const nextPokemonText = screen.getByText('Charmander');
    expect(nextPokemonText).toBeInTheDocument();
  });

  test('Deve ser exibido apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
  });

  test('Deve exibir todos os filtros', () => {
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

  test('Deve exibir todos os pokémons quando o filtro All é selecionado', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Poison' }));
    expect(screen.getByText('Ekans')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
