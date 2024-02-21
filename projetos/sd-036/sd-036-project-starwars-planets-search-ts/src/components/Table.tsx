import { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

export default function Table() {
  const {
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
  } = useContext(PlanetsContext);

  return (
    <>
      <input data-testid="name-filter" onChange={ handleTextFilterChange } />
      <select id="column-filter" data-testid="column-filter">
        {numericFilterOptions.map((option, index) => (
          <option key={ index } value={ option }>{ option }</option>
        ))}
      </select>
      <select id="comparison-filter" data-testid="comparison-filter">
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input id="value-filter" data-testid="value-filter" defaultValue="0" />
      <button
        data-testid="button-filter"
        onClick={ handleApplyNumericFilters }
      >
        Apply filters
      </button>
      {numericFilters.map((filter, index) => (
        <div key={ index } data-testid="filter">
          <span>
            { filter.column }
            {' '}
            |
            {' '}
            { filter.comparison }
            {' '}
            |
            {' '}
            { filter.value }
            {' '}
            <button onClick={ () => handleRemoveFilter(filter.column) }>Remover</button>
          </span>

        </div>
      ))}
      <button
        onClick={ handleRemoveAllNumericFilters }
        data-testid="button-remove-filters"
      >
        Remover todas as filtragens
      </button>
      <select data-testid="column-sort" id="column_sort">
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="ascendente">Ascendente</label>
      <input
        data-testid="column-sort-input-asc"
        id="ascendente"
        type="radio"
        value="ASC"
        name="sort"
      />
      <label htmlFor="descendente">Descendente</label>
      <input
        data-testid="column-sort-input-desc"
        id="descendente"
        type="radio"
        value="DESC"
        name="sort"
      />
      <button
        onClick={ handleSort }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => <th key={ index }>{ column }</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets
            .filter((planet) => planet.name.includes(textFilter)).map((planet, index) => (
              <tr key={ index }>
                { keys.map((key, index2) => {
                  if (key === 'name') {
                    return (
                      <td data-testid="planet-name" key={ index2 }>{ planet[key] }</td>
                    );
                  }
                  return <td key={ index2 }>{ planet[key] }</td>;
                }) }
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
