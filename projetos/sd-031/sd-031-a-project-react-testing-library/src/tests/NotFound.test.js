import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Componente NotFound', () => {
  test('Deve conter o título correto', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Deve verificar o atributo src da imagem', () => {
    const { getByAltText } = render(<NotFound />);
    expect(getByAltText('Pikachu crying because the page requested was not found')).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
