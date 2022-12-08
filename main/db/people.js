const connection = require("./connection");
const table = require("console.table");
const server = require('../server.js');
const inquirer = require("inquirer");

function showDepartments() {
    console.log('Showing all departments...\n');

    connection.query('SELECT * FROM department', function (err, res) {
      if (err) {
        console.log(err)
      };
      console.table(res);
    });
  };

function showRoles() {
    console.log('Showing all Roles...\n')
  
    connection.query('SELECT * from role', function (err, res) {
      console.table(res);
    });
  };
  

function showEmployees() {
  console.log('Showing all Employees...\n')

  connection.query('SELECT * from employees', function (err, res) {
    console.table(res);
  });
};

function addDepartment() {
  console.log('Add Your Department. \n');
  inquirer.prompt([
    {
      type: 'inout', 
      name: 'name',
      message: 'What is the name of the new department?',
      default: () => {},
      validate: name => {
        let valid = `/^[a-zA-Z0-9 ]{1,30}$/.test(name)`;
                if (valid) {
                    return true;
                } else {
                    console.log(`. Your name must be between 1 and 30 characters.`)
                    return false;
                }
              }
        }
  ]).then((answers) => {
    insertDepartment(answers.name);
  });
}

function insertDepartment(newDepart) {
  connection.query('INSERT INTO department SET ?',  (err, res) => {
    console.log(`Added ${newDepart} to Departments`);
  });
};

module.exports= {showDepartments, showRoles, showEmployees, addDepartment};