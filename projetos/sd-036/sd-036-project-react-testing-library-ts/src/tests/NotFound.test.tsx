import { render } from '@testing-library/react';
import NotFound from '../pages/NotFound/NotFound';

describe('NotFound Component', () => {
  test('Should contain the correct title', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Should verify the src attribute of the image', () => {
    const { getByAltText } = render(<NotFound />);
    expect(getByAltText("Clefairy pushing buttons randomly with text I have no idea what i'm doing")).toHaveAttribute(
      'src',
      '/404.gif',
    );
  });
});
