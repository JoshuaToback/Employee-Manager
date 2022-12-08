const connection = require("./connection");
const cTable = require("console.table");
const server = require('../server.js');

showDepartments = () => {
    console.log('Showing all departments...\n');
    connection.db = `SELECT department.id AS id, department.name AS department FROM department`; 

    connection.promise().query(sql, (err, rows) => {
      if (err) throw err;
      cTable.console.table(rows);
      server.promptUser();
    });
  };