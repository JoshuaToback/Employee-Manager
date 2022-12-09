const connection = require("./connection");
const table = require("console.table");
const server = require("../server");
const inquirer = require("inquirer");

function showDepartments() {
    connection.query('SELECT * FROM department', function (err, res) {
      if (err) {
        console.log(err)
      };
      console.log('\nShowing all departments...\n');
      console.table(res);
    });
};

function showRoles() {
    connection.query('SELECT * from role', function (err, res) {
      console.log('\nShowing all Roles...\n')
      console.table(res);
    });
};

function showEmployees() {
  connection.query('SELECT * from employees', function (err, res) {
    console.log('\nShowing all Employees...\n')
    console.table(res);
  });
};

function addDepartment() {
    let questions = [
      {
        type: "input",
        name: "name",
        message: "what is the new department name?"
      }
    ];
  
    inquirer.prompt(questions)
    .then(response => {
      const query = `INSERT INTO department (name) VALUES (?)`;
      connection.query(query, [response.name], (err, res) => {
        console.log(`Successfully inserted ${response.name} department at id ${res.insertId}`);
        showDepartments();
      });
    })
};

function deleteDepartment() {
    const deptSql = `SELECT * FROM department`; 
  
    connection.query(deptSql, (err, data) => {
      if (err) throw err; 

      const dept = data.map(({ name, id }) => ({ name: name, value: id }));
      inquirer.prompt([
        {
          type: 'list', 
          name: 'dept',
          message: "What department do you want to delete?",
          choices: dept
        }
      ])
        .then(deptChoice => {
          const dept = deptChoice.dept;
          const sql = `DELETE FROM department WHERE id = ?`;
  
          connection.query(sql, dept, (err, res) => {
            if (err) throw err;
          console.table(showDepartments());
          console.log(`The department ${dept} has been deleted!`); 
        });
      });
    });
};

function addRole() {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'role',
      message: "What role do you want to add?",
      validate: addRole => {
        if (addRole) {
            return true;
        } else {
            console.log('Please enter a role');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'salary',
      message: "What is the salary of this role?",
      validate: addSalary => {
        if (addSalary) {
            return true;
        } else {
            console.log('Please enter a Salary!');
            return false;
        }
      }
    }
  ]).then(answer => {
    const params = [answer.role, answer.salary];
    
    // Grabs Department from Department Table to Select for Role Assignment.
    connection.query(`SELECT name, id FROM department`, (err, data) => {
      if (err) throw err; 
  
      const dept = data.map(({ name, id }) => ({ name: name, value: id }));

      inquirer.prompt([
      {
        type: 'list', 
        name: 'dept',
        message: "What department is this role in?",
        choices: dept
      }
      ])
        .then(deptChoice => {
          const dept = deptChoice.dept;
          params.push(dept);

          const sql = `INSERT INTO role (title, salary, department_id)
                      VALUES (?, ?, ?)`;

          connection.query(sql, params, function (err, result) {
            if (err) throw err;
            console.log('Added ' + answer.role + " to roles!"); 

            console.table(showRoles());
     });
   });
 });
});
};

function deleteRole() {
    const roleSql = `SELECT * FROM role`; 
  
    connection.query(roleSql, (err, data) => {
      if (err) throw err; 

      const role = data.map(({ title, id }) => ({ name: title, value: id }));
      inquirer.prompt([
        {
          type: 'list', 
          name: 'role',
          message: "What role do you want to delete?",
          choices: role
        }
      ])
        .then(roleChoice => {
          const role = roleChoice.role;
          const sql = `DELETE FROM role WHERE id = ?`;
  
          connection.query(sql, role, (err, res) => {
            if (err) throw err;
          console.table(showRoles());
          console.log(`The department ${role} has been deleted!`); 
        });
      });
    });
};

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'fistName',
      message: "What is the employee's first name?",
      validate: addFirst => {
        if (addFirst) {
            return true;
        } else {
            console.log('Please enter a first name');
            return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: addLast => {
        if (addLast) {
            return true;
        } else {
            console.log('Please enter a last name');
            return false;
        }
      }
    }
  ])
    .then(answer => {
    const params = [answer.fistName, answer.lastName]

    // grab roles from roles table
    const roleSql = `SELECT role.id, role.title FROM role`;
  
    connection.query(roleSql, (err, data) => {
      if (err) throw err; 
      
      const roles = data.map(({ id, title }) => ({ name: title, value: id }));

      inquirer.prompt([
            {
              type: 'list',
              name: 'role',
              message: "What is the employee's role?",
              choices: roles
            }
          ])
            .then(roleChoice => {
              const role = roleChoice.role;
              params.push(role);

              const managerSql = `SELECT * FROM employees`;

              connection.query(managerSql, (err, data) => {
                if (err) throw err;

                const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

                inquirer.prompt([
                  {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: managers
                  }
                ])
                  .then(managerChoice => {
                    const manager = managerChoice.manager;
                    params.push(manager);

                    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;

                    connection.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Employee has been added!")

                    showEmployees();
                  });
                });
              });
            });
          });
        });
};

function deleteEmployee() {
  const employeeSql = `SELECT * FROM employees`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err; 

  const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to delete?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;

        const sql = `DELETE FROM employees WHERE id = ?`;

        connection.query(sql, employee, (err, result) => {
          if (err) throw err;
          console.log("Successfully Deleted!");
        
          showEmployees();
    });
  });
 });
};

function updateEmployee() {
  const employeeSql = `SELECT * FROM employees`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err; 

  const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to update?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = []; 
        params.push(employee);

        const roleSql = `SELECT * FROM role`;

        connection.query(roleSql, (err, data) => {
          if (err) throw err; 

          const roles = data.map(({ id, title }) => ({ name: title, value: id }));
          
            inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's new role?",
                choices: roles
              }
            ])
                .then(roleChoice => {
                const role = roleChoice.role;
                params.push(role); 
                
                let employee = params[0]
                params[0] = role
                params[1] = employee 
                

                // console.log(params)

                const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;

                connection.query(sql, params, (err, result) => {
                  if (err) throw err;
                console.log("Employee has been updated!");
              
                showEmployees();
          });
        });
      });
    });
  });
};

module.exports= {showDepartments, addDepartment, deleteDepartment, showRoles, addRole, deleteRole, showEmployees, addEmployee, deleteEmployee, updateEmployee};