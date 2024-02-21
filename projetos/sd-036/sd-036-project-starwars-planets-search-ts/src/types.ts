export type PlanetType = {
  [key: string]: any;
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type NumericFilterType = {
  column: string;
  comparison: string;
  value: number;
};

export type TestDataType = {
  count: number;
  next: string;
  previous: string | null;
  results: PlanetType[]
};

export type PlanetsContextProps = {
  children: React.ReactNode,
};

export type PlanetsContextType = {
  handleTextFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  numericFilterOptions: string[];
  handleApplyNumericFilters: () => void;
  numericFilters: NumericFilterType[];
  handleRemoveFilter: (column: string) => void;
  handleRemoveAllNumericFilters: () => void;
  handleSort: () => void;
  columns: string[];
  filteredPlanets: PlanetType[];
  textFilter: string;
  keys: string[];
};
