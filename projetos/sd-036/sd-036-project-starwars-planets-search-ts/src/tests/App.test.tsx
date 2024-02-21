import { vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from '../App';
import testData from '../../cypress/mocks/testData';

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(testData),
    })
  ) as unknown as typeof fetch;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Table component', () => {
  test('Should filter by name', async () => {
    const { getByTestId, getByText, queryByText } = render(<App />);
    const textInput = getByTestId('name-filter');

    await waitFor(() => {
      expect(getByText('Hoth')).toBeInTheDocument();
    });

    await userEvent.type(textInput, 'oo');

    await waitFor(() => {
      expect(queryByText('Hoth')).not.toBeInTheDocument();
      expect(getByText('Naboo')).toBeInTheDocument();
    });
  });

  test('Should filter by numeric values', async () => {
    const { getByTestId, getByText, queryByText, queryByTestId, getAllByTestId } = render(<App />);
    const columnInput = getByTestId('column-filter');
    const comparisonInput = getByTestId('comparison-filter');
    const valueInput = getByTestId('value-filter');

    await waitFor(() => {
      const planetList = getAllByTestId('planet-name');
      expect(planetList).toHaveLength(10);
    });

    await userEvent.selectOptions(columnInput, 'population');
    await userEvent.selectOptions(comparisonInput, 'maior que');
    await userEvent.type(valueInput, '100000');
    await userEvent.click(getByTestId('button-filter'));

    await waitFor(() => {
      const planetList = getAllByTestId('planet-name');
      expect(planetList).toHaveLength(7);
      expect(queryByText('Yavin IV')).not.toBeInTheDocument();
      expect(getByText('Alderaan')).toBeInTheDocument();
    });
    
    let removeFilterButton = getByTestId('filter').querySelector('button');

    if (removeFilterButton) {
      await userEvent.click(removeFilterButton);
    }

    expect(queryByTestId('filter')).not.toBeInTheDocument();

    await waitFor(() => {
      const planetList = getAllByTestId('planet-name');
      expect(planetList).toHaveLength(10);
    });

    await userEvent.selectOptions(columnInput, 'population');
    await userEvent.selectOptions(comparisonInput, 'menor que');
    await userEvent.type(valueInput, '500000');
    await userEvent.click(getByTestId('button-filter'));

    await waitFor(() => {
      const planetList = getAllByTestId('planet-name');
      expect(planetList).toHaveLength(2);
      expect(getByText('Yavin IV')).toBeInTheDocument();
      expect(getByText('Tatooine')).toBeInTheDocument();
    });

    await userEvent.selectOptions(columnInput, 'rotation_period');
    await userEvent.selectOptions(comparisonInput, 'igual a');
    await userEvent.type(valueInput, '24');
    await userEvent.click(getByTestId('button-filter'));

    await waitFor(() => {
      const planetList = getAllByTestId('planet-name');
      expect(planetList).toHaveLength(1);
      expect(getByText('Yavin IV')).toBeInTheDocument();
    });

    await userEvent.click(getByTestId('button-remove-filters'));

    await waitFor(() => {
      const planetList = getAllByTestId('planet-name');
      expect(planetList).toHaveLength(10);
    });
  });

  test('Should order by population', async () => {
    const { getByTestId, getByText, queryByText, getAllByTestId } = render(<App />);
    const columnInput = getByTestId('column-sort');
    const sortInputAsc = getByTestId('column-sort-input-asc');
    const sortInputDesc = getByTestId('column-sort-input-desc');
    const sortButton = getByTestId('column-sort-button');

    await waitFor(() => {
      const planetList = getAllByTestId('planet-name');
      expect(planetList[0]).toHaveTextContent('Tatooine');
      expect(planetList[planetList.length - 1]).toHaveTextContent('Kamino');
    });

    await userEvent.selectOptions(columnInput, 'population');
    await userEvent.click(sortInputAsc);
    await userEvent.click(sortButton);

    await waitFor(() => {
      const planetList = getAllByTestId('planet-name');
      expect(planetList[0]).toHaveTextContent('Yavin IV');
      expect(planetList[planetList.length - 1]).toHaveTextContent('Dagobah');
    });

    await userEvent.selectOptions(columnInput, 'population');
    await userEvent.click(sortInputDesc);
    await userEvent.click(sortButton);

    await waitFor(() => {
      const planetList = getAllByTestId('planet-name');
      expect(planetList[0]).toHaveTextContent('Coruscant');
      expect(planetList[planetList.length - 1]).toHaveTextContent('Dagobah');
    });
  });
});