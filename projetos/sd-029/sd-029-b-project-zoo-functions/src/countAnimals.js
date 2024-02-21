const data = require('../data/zoo_data');

const countAnimals = (animalName) => {
  if (animalName === undefined) {
    const animals = {};
    data.species.forEach((specie) => {
      animals[specie.name] = specie.residents.length;
    });
    return animals;
  }
  if (Object.prototype.hasOwnProperty.call(animalName, 'sex')) {
    const animal = data.species.find((specie) => specie.name === animalName.species);
    const animals = animal.residents.filter((specie) => specie.sex === animalName.sex);
    return animals.length;
  }
  const animal = data.species.find((specie) => specie.name === animalName.species);
  return animal.residents.length;
};

module.exports = countAnimals;
