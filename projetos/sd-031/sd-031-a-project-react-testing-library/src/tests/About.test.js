import React from 'react';
import { render } from '@testing-library/react';
import About from '../pages/About';

describe('Componente About', () => {
  test('Deve conter as informações sobre a Pokédex', () => {
    const { getByRole } = render(<About />);
    const heading = getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Deve verificar o atributo src da imagem', () => {
    const { getByAltText } = render(<About />);
    expect(getByAltText('Pokédex')).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
