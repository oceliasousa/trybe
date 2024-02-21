import { useEffect, useState } from 'react';
import { NumericFilterType, PlanetType, PlanetsContextProps } from '../types';
import { PlanetsContext } from './PlanetsContext';

function PlanetsProvider({ children }: PlanetsContextProps) {
  const defaultNumericFilterOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const columns = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];

  const keys = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
    'films',
    'created',
    'edited',
    'url',
  ];

  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [textFilter, setTextFilter] = useState<string>('');
  const [filteredPlanets, setFilteredPlanets] = useState<PlanetType[]>([]);
  const [numericFilters, setNumericFilters] = useState<NumericFilterType[]>([]);
  const [numericFilterOptions, setNumericFilterOptions] = useState(
    defaultNumericFilterOptions,
  );

  useEffect(() => {
    fetch('https://swapi.dev/api/planets').then((response) => response.json().then((jsonResponse) => { setPlanets(jsonResponse.results); setFilteredPlanets(jsonResponse.results); }));
  }, []);

  useEffect(() => {
    let tempFilteredPlanets = planets;

    numericFilters.forEach((filter) => {
      tempFilteredPlanets = tempFilteredPlanets.filter((planet) => {
        const value = Number(planet[filter.column]);
        if (filter.comparison === 'maior que') {
          return !Number.isNaN(value) && value > filter.value;
        }
        if (filter.comparison === 'menor que') {
          return !Number.isNaN(value) && value < filter.value;
        }
        return value === filter.value;
      });
    });

    setFilteredPlanets(tempFilteredPlanets);
  }, [planets, numericFilters]);

  const handleTextFilterChange = (event: { target: { value: string; }; }) => {
    const { value } = event.target;
    setTextFilter(value);
  };

  const handleApplyNumericFilters = () => {
    const columnFilter = (document.getElementById('column-filter') as HTMLInputElement)
      .value;
    const comparisonFilter = (
      document.getElementById('comparison-filter') as HTMLInputElement
    )
      .value;
    const valueFilter = Number(
      (document.getElementById('value-filter') as HTMLInputElement).value,
    );

    (document.getElementById('value-filter') as HTMLInputElement).value = '';

    setNumericFilterOptions(numericFilterOptions
      .filter((option) => option !== columnFilter));

    setNumericFilters([...numericFilters, {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    }]);
  };

  const handleRemoveFilter = (column: string) => {
    setNumericFilterOptions([...numericFilterOptions, column]);
    setNumericFilters(numericFilters.filter((filter) => filter.column !== column));
  };

  const handleSort = () => {
    const sortColumn = (document.getElementById('column_sort') as HTMLInputElement)
      .value;
    const sortOrders = document.getElementsByName('sort');
    let sortOrder = '';
    for (let i = 0; i < sortOrders.length; i++) {
      if ((sortOrders[i] as HTMLInputElement).checked) {
        sortOrder = (sortOrders[i] as HTMLInputElement).value;
        break;
      }
    }

    setFilteredPlanets(
      [...filteredPlanets].sort((a, b) => {
        const numberA = Number(a[sortColumn]);
        const numberB = Number(b[sortColumn]);
        if (Number.isNaN(numberA)) return 1;
        if (Number.isNaN(numberB)) return -1;
        if (sortOrder === 'ASC') {
          return numberA - numberB;
        }
        return numberB - numberA;
      }),
    );
  };

  const handleRemoveAllNumericFilters = () => {
    setNumericFilterOptions(defaultNumericFilterOptions);
    setNumericFilters([]);
  };

  return (
    <PlanetsContext.Provider
      value={
      {
        handleTextFilterChange,
        numericFilterOptions,
        handleApplyNumericFilters,
        numericFilters,
        handleRemoveFilter,
        handleRemoveAllNumericFilters,
        handleSort,
        columns,
        filteredPlanets,
        textFilter,
        keys,
      }
    }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
