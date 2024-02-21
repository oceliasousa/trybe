import { render } from '@testing-library/react';
import NotFound from '../pages/NotFound/NotFound';

describe('Componente NotFound', () => {
  test('Deve conter o título correto', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Deve verificar o atributo src da imagem', () => {
    const { getByAltText } = render(<NotFound />);
    expect(getByAltText("Clefairy pushing buttons randomly with text I have no idea what i'm doing")).toHaveAttribute(
      'src',
      '/404.gif',
    );
  });
});
