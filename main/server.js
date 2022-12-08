const inquirer = require("inquirer");
const connection = require("./db/connection");
const peopleController = require('./db/people')

function promptUser() {
  console.log("***********************************")
  console.log("*                                 *")
  console.log("*        EMPLOYEE TRACKER         *")
  console.log("*                                 *")
  console.log("***********************************")
  inquirer.prompt([
    {
      type: "list",
      name: "choices",
      message: "What would you like to Manage today?",
      choices: [
          'View all Departments', 
          'View all Roles', 
          'View all Employees', 
          'Add a Department', 
          'Add a Role', 
          'Add an Employee', 
          'Update an Employee Role',
          'Update an Employee Manager',
          "View Employees by Department",
          'Delete a Department',
          'Delete a Role',
          'Delete an Employee',
          'View Department Budgets',
          'End Program'
      ]
    }
  ])
  .then((answers) => {
    const { choices } = answers;

    if (choices === 'View all Departments') {
      peopleController.showDepartments();
    };

    if (choices === 'View all Roles') {
      peopleController.showRoles();
    };

    if (choices === 'View all Employees') {
      peopleController.showEmployees();
    }

    if (choices === 'Add a Department') {
      peopleController.addDepartment();
    }


    if (choices === 'End Program') {
      connection.end();
      return;
    }
    promptUser();
  });
  
};
console.log('\n\n')
promptUser();

module.exports = promptUser;