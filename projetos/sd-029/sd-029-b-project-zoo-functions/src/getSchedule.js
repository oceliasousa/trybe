const data = require('../data/zoo_data');

const creatDay = (day, weekDay) => {
  let officeHour;
  let exhibition;
  if (day.open === 0 && day.close === 0) {
    officeHour = 'CLOSED';
    exhibition = 'The zoo will be closed!';
  } else {
    officeHour = `Open from ${day.open}am until ${day.close}pm`;
    exhibition = data.species.filter((specie) => specie.availability
      .includes(weekDay)).map((specie) => specie.name);
  }
  return { officeHour, exhibition };
};

const getSchedule = (scheduleTarget) => {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  if (weekDays.includes(scheduleTarget)) {
    return { [scheduleTarget]: creatDay(data.hours[scheduleTarget], scheduleTarget) };
  }
  if (data.species.find((specie) => specie.name === scheduleTarget)) {
    return data.species.find((specie) => specie.name === scheduleTarget).availability;
  }
  const days = {};
  Object.keys(data.hours).forEach((day) => {
    days[day] = creatDay(data.hours[day], day);
  });
  return days;
};

module.exports = getSchedule;
