// Code Goes Here
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


require('dotenv').config()

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: root,
    // MySQL password
    password: db_password,
    database: employee_db
  },
  console.log(`Connected to the employee_db database.`)
);

connection.connect(err => {
  if (err) throw err;
  console.log('connection failed, reason pending')
  launchManager();
});

// I kinda wish I was better at ASCII art, but this will do now now
const launchManager = () => {
  console.log('++++++++++++++++++++++++++++++++');
  console.log('+                              +');
  console.log('+       Employee Tracker       +');
  console.log('+                              +');
  console.log('++++++++++++++++++++++++++++++++');
  inquiryStart();
}

// now for the inquirer questions
inquiryStart = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'actions',
      message: 'What shall we do?',
      choices: [
        'List all Departments',
        'List all Roles',
        'List all Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Update an Employee Manager',
        'Delete a Department',
        'Delete a Role',
        'Exterminate an Employee',
        'View Department Budget',
        'Exit'
      ]
    }
  ]).then((answers) => {
    const { actions } = answers;

    if (actions === 'List all Departments') {
      listDepartments();
    }

    if (actions === 'List all Roles') {
      listRoles();
    }

    if (actions === 'List all Employees') {
      listEmployees();
    }

    if (actions === 'Add a Department') {
      addDepartment();
    }

    if (actions === 'Add a Role') {
      addRole();
    }

    if (actions === 'Add an Employee') {
      addEmployee();
    }

    if (actions === 'Update an Employee Role') {
      updateEmployeeRole();
    }

    if (actions === 'Update an Employee Manager') {
      updateEmployeeManager();
      console.log('Employee manager has been updated.');
    }

    if (actions === 'Delete a Department') {
      deleteDepartment();
      console.log('Department has been deleted.');
    }

    if (actions === 'Delete a Role') {
      deleteRole();
      console.log('Role has been deleted.');
    }

    if (actions === 'Exterminate an Employee') {
      purgeEmployee();
      console.log('Target employee has been expunged from the company and erased from the historical record. They never existed.');
    }

    if (actions === 'View Department Budget') {
      viewBudget();
      console.log('Departmental budget has been mathed out. Louie has immunity.');
    }

    if (actions === 'Exit') {
      connection.end();
    };
  });
};

// IN PROGRESS

// Now for functions

const listDepartments = () => {
  const sqlDeptList = `SELECT * FROM department`;

  db.query(sqlDeptList, (error, results) => {
    if (error) throw error;
    console.table(results);
    inquiryStart();
  });
}

const listRoles = () => {
  const sqlRoleList = `SELECT * FROM role`;

  db.query(sqlRoleList, (error, results) => {
    dc
    if (error) throw error;
    console.table(results);
    inquiryStart();
  });
}

const listEmployees = () => {
  const sqlEmployeeList = `SELECT * FROM employee`;

  db.query(sqlEmployeeList, (error, results) => {
    if (error) throw error;
    console.table(results);
    inquiryStart();
  });
}

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'What is the name of the new department you would like to add?',
      validate: addDept => {
        if (addDept) {
          return true;
        } else {
          console.log('Please enter a department name.');
          return false;
        }
      }
    }
  ]).then((answer) => {
    const sqlNewDept = `INSERT INTO department (name) VALUES (?)`;
    db.query(sqlNewDept, answer.department, (error, results) => {
      if (error) throw error;
      console.log(`New department added: ${answer.department}.`);
      inquiryStart();
    });
  });
}

const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new role you would like to add?',
      validate: addTitle => {
        if (addTitle) {
          return true;
        } else {
          console.log('Please enter a title for the new role.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for the new role you would like to add?',
      validate: addSalary => {
        if (addSalary) {
          return true;
        } else {
          console.log('Please enter a salary for the new role.');
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'department',
      message: 'What department does the new role belong to?',
      choices: function () {
        let departmentList = result[0].map(choice = choice.department)
        return departmentList;
      }
    }
  ]).then((answer) => {
    const sqlNewRole = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    db.query(sqlNewRole, [answer.title, answer.salary, answer.department], (error, results) => {
      if (error) throw error;
      console.log(`New role added: ${answer.title} has been added ${answer.department}.`);
      inquiryStart();
    });
  });
}



const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the new employee you would like to add?',
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
      name: 'last_name',
      message: 'What is the last name of the new employee you would like to add?',
      validate: addLast => {
        if (addLast) {
          return true;
        } else {
          console.log('Please enter a last name');
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'role_id',
      message: "What is the role of the new employee?",
      choices: function () {
        let roleList = results[0].map(choice => choice.title);
        return roleList;
      } 
    },
    {
      type: 'list',
      name: 'manager_id',
      message: "Who is the manager of the new employee?",
      choices: function () {
        let managerList = results[0].map(choice => choice.manager);
        return managerList;
      }
    }
  ]).then((answer) => {
    const sqlNewEmployee  = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    db.query(sqlNewEmployee, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (error, results) => {
      if (error) throw error;
      console.log(`New employee added: ${answer.first_name} ${answer.last_name}.`);
    });
    inquiryStart();
  });
}

const updateEmployeeRole = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Which employee would you like to update?',
      choices: function () {
        let employeeList = results[0].map(choice => choice.employee);
        return employeeList;
      }
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is the new role of the employee?',
      choices: function () {
        let roleList = results[0].map(choice => choice.title);
        return roleList;
      }
    },
  ]).then((answer) => {
    // Updating the employee role based on employee name. WILL THIS ACTUALLY WORK???
    const sqlUpdateEmployee = `UPDATE employee SET role_id = ? WHERE (first_name, last_name) VALUES (?, ?)`;
    db.query(sqlUpdateEmployee, [answer.role, answer.employee], (error, results) => {
      if (error) throw error;
      console.log(`Employee role updated: ${answer.employee}'s role is now ${answer.role}.`);
    });
    inquiryStart();
  });
}

const updateEmployeeManager = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Which employee would you like to update?',
      choices: function () {
        let employeeList = results[0].map(choice => choice.employee);
        return employeeList;
      }
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Who is the new manager of the employee?',
      choices: function () {
        let managerList = results[0].map(choice => choice.manager);
        return managerList;
      }
    },
  ]).then((answer) => {
    const sqlUpdateManager = `UPDATE employee SET manager_id = ? WHERE (first_name, last_name) VALUES (?, ?)`;
    db.query(sqlUpdateManager, [answer.manager, answer.employee], (error, results) => {
      if (error) throw error;
      console.log(`Employee manager updated: ${answer.employee}'s manager is now ${answer.manager}.`);
    });
    inquiryStart();
  });
}

const deleteDepartment = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'department',
      message: 'Which department would you like to delete?',
      choices: function () {
        let departmentList = results[0].map(choice => choice.department);
        return departmentList;
      }
    }
  ]).then ((answer) => {
    const sqlDeleteDepartment = `DELETE FROM department WHERE name = ?`;
    db.query(sqlDeleteDepartment, [answer.department], (error, results) => {
      if (error) throw error;
      console.log(`Department deleted: ${answer.department} has been deleted.`);
    });
    inquiryStart();
  });
}
    



