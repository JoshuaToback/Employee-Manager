USE company_db;
INSERT INTO department (name) VALUES ('Research and Development');
INSERT INTO role (title, salary, department_id) VALUES ('engineer', 75000.00, 1);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ('Joshua', 'Toback', 17, 1);