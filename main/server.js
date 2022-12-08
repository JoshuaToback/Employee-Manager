const inquirer = require("inquirer");
const connection = require("./db/connection");
const people = require('./db/people')

require('dotenv').config()

connection.connect(err => {
  if (err) {
  console.log('connected as id ' + connection.threadId);
   afterConnection();
  }
  });

const afterConnection = () => {
  console.log("***********************************")
  console.log("*                                 *")
  console.log("*        EMPLOYEE TRACKER         *")
  console.log("*                                 *")
  console.log("***********************************")
  promptUser();
};
  

const promptUser = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Welcome to the Employee Manager! What would you like to Manage today?",
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
          'No Action'
      ]
    }
  ])
  .then((answers) => {
    const { choices } = answers;

    if (choices === 'View all Departments') {
      console.log('Showing all Departments...\n');
      people.showDepartments();
    };

    if (choices === 'View all Roles') {
      console.log('Showing All Roles...\n');
    }
  });
};