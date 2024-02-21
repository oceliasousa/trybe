const data = require('../data/zoo_data');

const getOldestFromFirstSpecies = (id) => {
  const person = data.employees.find((employee) => employee.id === id);
  const animal = data.species.find((specie) => specie.id === person.responsibleFor[0]);
  const oldest = animal.residents.reduce((a, b) => ((a.age > b.age) ? a : b));
  return Object.values(oldest);
};

module.exports = getOldestFromFirstSpecies;
