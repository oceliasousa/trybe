const data = require('../data/zoo_data');

const getAnimalsOlderThan = (animal, age) => {
  const targetSpecie = data.species.find((specie) => specie.name === animal);
  return targetSpecie.residents.every((resident) => resident.age >= age);
};

module.exports = getAnimalsOlderThan;
