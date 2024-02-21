const data = require('../data/zoo_data');

const getSpeciesByIds = (...ids) => {
  if (ids.length === 0) {
    return [];
  }
  if (ids.length === 1) {
    return [data.species.find((specie) => specie.id === ids[0])];
  }
  const species = [];
  data.species.forEach((specie) => {
    if (ids.includes(specie.id)) {
      species.push(specie);
      console.log(ids);
    }
  });
  return species;
};

module.exports = getSpeciesByIds;
