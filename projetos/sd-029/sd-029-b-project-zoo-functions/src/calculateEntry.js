const data = require('../data/zoo_data');

const countEntrants = (entrants) => {
  let child = 0;
  let adult = 0;
  let senior = 0;
  entrants.forEach((entrant) => {
    if (entrant.age < 18) {
      child += 1;
    } else if (entrant.age >= 18 && entrant.age < 50) {
      adult += 1;
    } else {
      senior += 1;
    }
  });
  return { child, adult, senior };
};

const calculateEntry = (entrants) => {
  if (entrants === undefined || entrants === [] || Object.keys(entrants).length === 0) {
    return 0;
  }
  let total = 0;
  const list = countEntrants(entrants);
  total += list.child * data.prices.child;
  total += list.adult * data.prices.adult;
  total += list.senior * data.prices.senior;
  return total;
};

module.exports = { calculateEntry, countEntrants };
