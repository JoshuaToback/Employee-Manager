const inquirer = require("inquirer");
const connection = require("./db/connection");
const peopleController = require('./db/people')

function promptUser() {
  console.log("***********************************")
  console.log("*                                 *")
  console.log("*        EMPLOYEE TRACKER         *")
  console.log("*                                 *")
  console.log("***********************************")
  console.log('\nWelcome to the Employee Tracker! What would you like to manage today? \n');
  inquirer.prompt([
    {
      type: "list",
      message: 'What would you like to do?',
      name: "choices",
      choices: [
          'View all Departments', 
          'View all Roles', 
          'View all Employees', 
          'Add a Department', 
          'Add a Role', 
          'Add an Employee', 
          'Update an Employee Role',
          'Delete a Department',
          'Delete a Role',
          'Delete an Employee',
          'End Program'
      ]
    }
  ]).then((answers) => {
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

    if (choices === 'Add a Role') {
      peopleController.addRole();
    }

    if (choices === 'Add an Employee') {
      peopleController.addEmployee();
    }

    if (choices === 'Delete a Department') {
      peopleController.deleteDepartment();
    }

    if (choices === 'Delete a Role') {
      peopleController.deleteRole();
    }

    if (choices === 'Delete an Employee') {
      peopleController.deleteEmployee();
    }

    if (choices === 'Update an Employee Role') {
      peopleController.updateEmployee();
    }
    if (choices === 'End Program') {
      connection.end();
      return;
    }
  });
  
};
console.log('\n\n')
promptUser();

module.exports = {promptUser}