const cTable = require("console.table");
const inquirer = require("inquirer");
const connection = require("./db/connection");

const questions = [
    {
      type: "list",
      name: "choice",
      message: "Welcome to the Employee Manager! What would you like to Manage today?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER"
        },

        {
          name: "Add Employee",
          value: "add_employee",
        },
        {
          name: "Remove Employee",
          value: "remove_employee",
        },
        {
          name: "Update Employee Role",
          value: "update_employee_position",
        },
        {
          name: "Update Employee Manager",
          value: "update_employee_manager",
        },
        {
          name: "View All Roles",
          value: "view_positions",
        },
        {
          name: "Add Role",
          value: "add_position",
        },
        {
          name: "Remove Role",
          value: "remove_position",
        },
        {
          name: "View All Departments",
          value: "view_branches",
        },
        {
          name: "Add Department",
          value: "add_branch",
        },
        {
          name: "Remove Department",
          value: "remove_branch",
        },
        {
          name: "View Total Utilized Budget By Department",
          value: "view_budget_by_branch",
        },
        {
          name: "Quit",
          value: "quit",
        }
      ],
    },
];
  // Prompt functions

  const init = () => {
    return inquirer.prompt(questions)
  }

  // Function to Initialize App
  init();