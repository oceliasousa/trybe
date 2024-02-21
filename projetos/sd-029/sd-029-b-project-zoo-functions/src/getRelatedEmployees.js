const data = require('../data/zoo_data');

const isManager = (id) => data.employees.some((employee) => employee.managers.includes(id));

const getRelatedEmployees = (managerId) => {
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  const managers = [];
  data.employees.forEach((employee) => {
    if (employee.managers.includes(managerId)) {
      managers.push(`${employee.firstName} ${employee.lastName}`);
    }
  });
  return managers;
};

module.exports = { isManager, getRelatedEmployees };
