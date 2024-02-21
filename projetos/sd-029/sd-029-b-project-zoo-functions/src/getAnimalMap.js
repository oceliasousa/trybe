const data = require('../data/zoo_data');

const filterBySex = (acc, specie, options) => {
  acc[specie.location].push({ [specie.name]: specie.residents.reduce((acc2, resident) => {
    if (resident.sex === options.sex) {
      acc2.push(resident.name);
    }
    return options.sorted ? acc2.sort() : acc2;
  }, []) });
};

const getWithNames = (options) => data.species.reduce((acc, specie) => {
  if (options.sex) {
    filterBySex(acc, specie, options);
  } else if (options.sorted) {
    acc[specie.location]
      .push({ [specie.name]: specie.residents.map((resident) => resident.name).sort() });
  } else {
    acc[specie.location].push({ [specie.name]: specie.residents.map((resident) => resident.name) });
  }
  return acc;
}, { NE: [], NW: [], SE: [], SW: [] });

const getWithoutNames = () => data.species.reduce((acc, specie) => {
  acc[specie.location].push(specie.name);
  return acc;
}, { NE: [], NW: [], SE: [], SW: [] });

const getAnimalMap = (options) => {
  if (options === undefined || !options.includeNames) {
    return getWithoutNames();
  }
  if (options.includeNames) {
    return getWithNames(options);
  }
};

module.exports = getAnimalMap;
