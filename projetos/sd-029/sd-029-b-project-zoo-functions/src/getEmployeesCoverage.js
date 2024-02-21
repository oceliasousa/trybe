const data = require('../data/zoo_data');

const personInfo = (person) => {
  const object = {
    id: person.id,
    fullName: `${person.firstName} ${person.lastName}`,
    species: person.responsibleFor
      .map((specieId) => data.species.find((specie) => specie.id === specieId).name),
    locations: person.responsibleFor
      .map((specieId) => data.species.find((specie) => specie.id === specieId).location),
  };
  return object;
};

const getEmployeesCoverage = (object) => {
  if (object === undefined) {
    return data.employees.map((employee) => personInfo(employee));
  }
  let person;
  if (Object.prototype.hasOwnProperty.call(object, 'name')) {
    person = data.employees
      .find((employee) => employee.firstName === object.name || employee.lastName === object.name);
  } else if (Object.prototype.hasOwnProperty.call(object, 'id')) {
    person = data.employees.find((employee) => employee.id === object.id);
  }
  if (!person) {
    throw new Error('Informações inválidas');
  }
  return personInfo(person);
};

module.exports = getEmployeesCoverage;
