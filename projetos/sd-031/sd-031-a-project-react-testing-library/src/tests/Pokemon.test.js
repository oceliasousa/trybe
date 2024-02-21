import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Componente Pokemon', () => {
  test('Deve renderizar o alt e src correto', () => {
    const { getByAltText } = renderWithRouter(<App />);
    expect(getByAltText('Pikachu sprite')).toHaveAttribute(
      'src',
      'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  test('Deve renderizar os atributos do pokémon corretamente', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
      'Average weight: 6.0 kg',
    );
  });

  test('Deve renderizar o ícone de favorito corretamente', () => {
    const { getByAltText } = renderWithRouter(<App />);
    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByText('Favorite Pokémon'));
    expect(getByAltText('Pikachu is marked as favorite')).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );
    expect(getByAltText('Pikachu is marked as favorite')).toHaveAttribute(
      'class',
      'favorite-icon',
    );
  });

  test('Deve exibir na tela um texto com o tipo do pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-type')).toHaveTextContent('Electric');
  });

  test('Deve exibir na tela um link para o pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('More details')).toHaveAttribute('href', '/pokemon/25');
  });
});
